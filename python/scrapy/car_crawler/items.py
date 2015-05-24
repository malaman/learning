# -*- coding: utf-8 -*-

# Define here the models for your scraped items
#
# See documentation in:
# http://doc.scrapy.org/en/latest/topics/items.html

import scrapy


class CarCrawlerItem(scrapy.Item):
    # define the fields for your item here like:
    url = scrapy.Field()
    maker = scrapy.Field()
    model = scrapy.Field()
    auto_ria_id = scrapy.Field()
    published = scrapy.Field()
    title_img = scrapy.Field()
    price_uah = scrapy.Field()
    price_usd = scrapy.Field()
    odometer = scrapy.Field()
    transmission = scrapy.Field()
    color = scrapy.Field()
    fuel = scrapy.Field()
    volume = scrapy.Field()
    region = scrapy.Field()
    contact = scrapy.Field()
    phone = scrapy.Field()
    comfort = scrapy.Field()
    multimedia = scrapy.Field()
    other = scrapy.Field()
    safety = scrapy.Field()
    condition = scrapy.Field()
    ext_id = scrapy.Field()
    doors = scrapy.Field()
    damaged = scrapy.Field()
    accident = scrapy.Field()
    is_salon = scrapy.Field()
    user_ads = scrapy.Field()
    maker_name = scrapy.Field()
    model_name = scrapy.Field()
    year = scrapy.Field()
    power = scrapy.Field()
    drive = scrapy.Field()
    custom = scrapy.Field()
    sold = scrapy.Field()
    exchange_type = scrapy.Field()
    credit = scrapy.Field()
    body = scrapy.Field()
    volume = scrapy.Field()

