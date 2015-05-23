# -*- encoding: utf-8 -*-

import scrapy
from scrapy.http import Response
from scrapy.http import TextResponse
from scrapy import Selector
from selenium import webdriver
import codecs
from url_crawler.items import UrlItem


class AutoRiaUrlSpider(scrapy.Spider):
    name="url_spider"
    allowed_domains = ["infocar.ua"]
    start_urls = ["http://infocar.ua/search/?countpage=100&category_id=1&currency=1&power_name=1&fuelRatesType=city&with_exchange=1&matched_country=-1&target=search&event=little&lang_id=2&chooseTypeSearchAuto=oldAutos&page=0"]
    next_url_string = "http://infocar.ua/search/?countpage=100&category_id=1&currency=1&power_name=1&fuelRatesType=city&with_exchange=1&matched_country=-1&target=search&event=little&lang_id=2&chooseTypeSearchAuto=oldAutos&page={page}"

    def __init__(self):
        self.page_num = 0

    def __del__(self):
        self.driver.close()
        self.selenium.stop()

    def parse(self, response):
        self.driver = webdriver.PhantomJS()
        self.driver.get(response.url)
        text_html=self.driver.page_source.encode('utf-8')
        self.driver.close()
        html_str=str(text_html)
        resp_for_scrapy=TextResponse('none',200,{},html_str,[],None)
        hxs=Selector(resp_for_scrapy)
        search_results = hxs.xpath('//div[@id="search_auto_results"]')
        item = UrlItem()
        item['url_list'] = []
        for elem in search_results.xpath('div/div[@class="ticket-item paid"]|div/div[@class="ticket-item"]'):
            try:
                item['url_list'].append(''.join(['http://infocar.ua', elem.xpath('div[2]/div[1]/a/@href').extract()[0]]))
            except IndexError:
                pass
        yield item
        if self.page_num == 0:
            try:
                self.page_num = int(hxs.xpath('//*[@id="search_results_pager"]/div[2]/a[6]/text()').extract()[0].strip())
            except ValueError:
                self.page_num = 1100
        for i in xrange(1, self.page_num):
            yield scrapy.Request(self.next_url_string.format(page=i), callback=self.parse)