# -*- coding: utf-8 -*-

# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: http://doc.scrapy.org/en/latest/topics/item-pipeline.html
import json
import codecs
import shutil


class JsonWithEncodingPipeline(object):

    def __init__(self):
        try:
            url_file = codecs.open('infocar_url.json', 'r')
            shutil.copyfile('infocar_url.json', 'infocar_url_old.json')
            self.file = codecs.open('infocar_url.json', 'w', encoding='utf-8')
        except Exception:
            self.file = codecs.open('infocar_url.json', 'w', encoding='utf-8')

    def process_item(self, item, spider):
        line = json.dumps(dict(item), ensure_ascii=False) + "\n"
        self.file.write(line)
        return item

    def spider_closed(self, spider):
        self.file.close()
