const Knwl = require('knwl.js')
const fetch = require('node-fetch')
const cheerio = require('cheerio')
const cheerioUtils = require('./cheerio-utils')

async function scrape (url, dataTypes) {
  const knwl = new Knwl()

  const res = await fetch(url)
  const html = await res.text()

  const $ = cheerio.load(html)

  const textNodes = cheerioUtils.getAllTextNodes($, $('body'))

  const data = {}

  for (const dataType of dataTypes) {
    data[dataType] = []
  }

  for (const text of textNodes) {
    knwl.init(text)

    for (const dataType of dataTypes) {
      const scraped = knwl.get(dataType)
      data[dataType] = data[dataType].concat(scraped)
    }
  }

  return data
}

module.exports = {
  scrape
}
