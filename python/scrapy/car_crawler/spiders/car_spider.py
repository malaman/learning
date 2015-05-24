# -*- encoding: utf-8 -*-

import scrapy
from scrapy.http import Response
from scrapy.http import TextResponse
from scrapy import Selector
from selenium import webdriver
from car_crawler.items import CarCrawlerItem
import codecs
from fabric.colors import red, green

from car_crawler.settings import *
import os
import json


class InfoCarUrlSpider(scrapy.Spider):
    name="car_spider"
    allowed_domains = ["infocar.ua"]

    def __init__(self):
        self.start_urls = self._load_start_urls()

    @staticmethod
    def _load_start_urls():
        url_file = os.path.join(CRAWLER_BASE_DIR, 'url_crawler/info_car_url.json')
        start_urls = []
        with open(url_file) as json_file:
            lines = json_file.readlines()
            for line in lines:
                line_dict = json.loads(line)
                start_urls += line_dict['url_list']
        return start_urls

    @staticmethod
    def _select_item(hxs, xpath):
        field = hxs.xpath(xpath).extract()
        field = ''.join(field)
        if len(field) == 0:
            return ''
        return field

    @classmethod
    def _set_item_technical_info(cls, item, hxs):
        """
        Args:
        item: CarCrawlerItem
        hxs: scrapy selected text

        Tries to find technical info fields in hxs. If such fields are find fill item fields with nessesary
        data
        """
        technical_info = hxs.xpath('//*[@class="box-panel rocon"]/dl')
        fields = {u'Коробка передач:': 'transmission', u'Цвет:': 'color', u'Топливо:': 'fuel',
                  u'Количество дверей:': 'doors', u'Привод:': 'drive',
                  u'Объем двигателя:': 'volume', u'Мощность: /': 'power', u'Мощность:': 'power'}
        for elem in technical_info.xpath('dd'):
            field = cls._select_item(elem, 'text()').strip()
            if field in fields.keys():
                item[fields[field]] = cls._select_item(elem, 'strong/text()')

    @classmethod
    def _set_item_description_info(cls, item, hxs):
        """
        Args:
        item: CarCrawlerItem
        hxs: scrapy selected text

        Tries to find description info fields in hxs. If such fields are find fill item fields with nessesary
        data
        """
        description_info = hxs.xpath('//*[@class="box-panel rocon"]')
        fields = {u'Комфорт:': 'comfort', u'Мультимедиа:': 'multimedia', u'Прочее:': 'other',
                  u'Безопасность:':'safety', u'Состояние:': 'condition'}
        for elem in description_info.xpath('p'):
            field = cls._select_item(elem, 'strong/text()').strip()
            if field in fields.keys():
                item[fields[field]] = cls._select_item(elem, 'text()').strip()

    @classmethod
    def _set_accident_credit_fields(cls, item, hxs):
        characteristic_info = hxs.xpath('//*[@class="characteristic delimeter"]')
        fields = {u'После ДТП': 'accident', u'Взято в кредит': 'credit'}
        for elem in characteristic_info.xpath('p'):
            field = cls._select_item(elem, 'strong/text()').strip()
            if field in fields.keys():
                item[fields[field]] = True
    @classmethod
    def _set_maker_model(cls, item, hxs):
        maker_model_str = cls._select_item(hxs, '//*[@class="head-cars"]/text()').strip()
        two_words_makers = ['Land', 'Alfa', 'Great']
        [maker, model] = maker_model_str.split(' ', 1)
        if maker in two_words_makers:
            [maker_word1, maker_word2, model] = maker_model_str.split(' ', 2)
            item['maker'] = ' '.join([maker_word1, maker_word2])
        else:
            if maker == u'ВАЗ':
                maker = u'ВАЗ (Lada)'
            item['maker'] = maker
        item['model'] = model



    def parse(self, response):
        try:
            item = CarCrawlerItem()
            item['url'] = response.url
            item['year'] = self._select_item(response, '//*[@class="head-cars"]/span/text()')
            item['ext_id'] = self._select_item(response, '//*[@class="icon-id-item"]/../strong/text()').strip()
            item['published'] = self._select_item(response, '//*[@id="final_page__add_date"]/@date')
            item['title_img'] = self._select_item(response, '//*[@id="final_page__main_photo"]/@src')
            item['price_uah'] = self._select_item(response, '//*[@id="final_page__main_info_block"]/div[1]/div[1]/div[1]/span/text()').replace(' ', '')
            item['price_usd'] = self._select_item(response, '//*[@id="final_page__main_info_block"]/div[1]/div[1]/div[3]/span[2]/text()').replace(' ', '')
            item['odometer'] = self._select_item(response, '//*[@id="probeg"]/../strong/text()').strip().replace('\n', '').replace(' ', '')
            item['region'] = self._select_item(response, '//*[@class="info-user"]/dd[1]/strong/text()').strip()
            item['contact'] = self._select_item(response, '//*[@class="info-user"]/dt[@class="user-name"]/text()').strip()
            item['phone'] = self._select_item(response, '//*[@id="final_page__user_phone_block"]/div[@class="item-param"]/strong/text()').strip()
            item['is_salon'] = self._select_item(response, '//*[@class="seller-data delimeter"]/text()').strip()
            item['user_ads'] = self._select_item(response, '//*[@id="final_page__user_ads_count"]/text()').strip()
            item['custom'] = self._select_item(response, '//*[@class="uncustomed"]/dt/text').strip()
            item['sold'] = self._select_item(response, '//*[@id="final_page__error_block_container"]/text()').strip()
            item['exchange_type'] = ' '.join(self._select_item(response, '//*[@id="final_page__exchanges_wrapper"]/div[1]/div[3]/dl/descendant::*/text()').split())
            item['body'] = self._select_item(response, '//*[@id="final_page__characteristic_body_name"]/text()').strip()
            self._set_item_description_info(item, response)
            self._set_item_technical_info(item, response)
            self._set_accident_credit_fields(item, response)
            self._set_maker_model(item, response)
            yield item
        except:
            print(red('Error in parsing {}'.format(response.url)))
            yield item

if __name__ == '__main__':
    spider = InfoCarUrlSpider()
    print(spider.start_urls)
