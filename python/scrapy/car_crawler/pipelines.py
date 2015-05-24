# -*- coding: utf-8 -*-

# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: http://doc.scrapy.org/en/latest/topics/item-pipeline.html


import json
import codecs
import shutil
import dateutil.parser


class JsonWithEncodingPipeline(object):

    def __init__(self):
        try:
            url_file = codecs.open('infocar_cars.json', 'r')
            shutil.copyfile('infocar_cars.json', 'infocar_cars_old.json')
            self.file = codecs.open('infocar_cars.json', 'w', encoding='utf-8')
        except Exception:
            self.file = codecs.open('infocar_cars.json', 'w', encoding='utf-8')


    def _set_odometer(self, item):
        odometer = item['odometer'].replace(u'тыс.км', '')
        if odometer.isdigit():
            item['odometer'] = int(odometer)*1000
        else:
            item['odometer'] = 0

    def _set_boolean_fields(self, item):
        fields = ['is_salon', 'sold', 'custom']
        for field in fields:
            if item.has_key(field):
                if item[field]:
                    item[field] = True
                else:
                    item[field] = False

    def _set_integer_fields(self, item):
        fields = ['doors', 'year', 'price_uah', 'price_usd', "ext_id", "user_ads"]
        for field in fields:
            if item.has_key(field):
                if item[field].isdigit():
                    item[field] = int(item[field])
                else:
                    item[field] = 0

    def process_item(self, item, spider):
        self._set_odometer(item)
        self._set_boolean_fields(item)
        self._set_integer_fields(item)
        line = json.dumps(dict(item), ensure_ascii=False) + "\n"
        self.file.write(line)
        return item

    def spider_closed(self, spider):
        self.file.close()
