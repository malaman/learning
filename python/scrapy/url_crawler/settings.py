# -*- coding: utf-8 -*-

# Scrapy settings for url_crawler project
#
# For simplicity, this file contains only the most important settings by
# default. All the other settings are documented here:
#
#     http://doc.scrapy.org/en/latest/topics/settings.html
#

BOT_NAME = 'url_crawler'

SPIDER_MODULES = ['url_crawler.spiders']
NEWSPIDER_MODULE = 'url_crawler.spiders'

DOWNLOAD_DELAY = 0.5
# CONCURRENT_ITEMS = 100
# CONCURRENT_REQUESTS = 5
ITEM_PIPELINES = ['url_crawler.pipelines.JsonWithEncodingPipeline']

# Crawl responsibly by identifying yourself (and your website) on the user-agent
#USER_AGENT = 'url_crawler (+http://www.yourdomain.com)'
