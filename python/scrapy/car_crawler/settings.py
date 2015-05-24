# -*- coding: utf-8 -*-

# Scrapy settings for car_crawler project
#
# For simplicity, this file contains only the most important settings by
# default. All the other settings are documented here:
#
#     http://doc.scrapy.org/en/latest/topics/settings.html
#
import os


BOT_NAME = 'car_crawler'

SPIDER_MODULES = ['car_crawler.spiders']
NEWSPIDER_MODULE = 'car_crawler.spiders'
ITEM_PIPELINES = ['car_crawler.pipelines.JsonWithEncodingPipeline']

DOWNLOAD_DELAY = 0.5
# CONCURRENT_ITEMS = 100
# CONCURRENT_REQUESTS = 5

CRAWLER_BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(__file__)))

# Crawl responsibly by identifying yourself (and your website) on the user-agent
#USER_AGENT = 'car_crawler (+http://www.yourdomain.com)'
