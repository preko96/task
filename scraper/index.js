const scraper = require('./lib/scraper')

const args = process.argv.slice(2)

if (args.length < 1) {
  console.log('First argument is required: email address')
  process.exit(1)
}

const input = args[0]
const atCharIndex = input.indexOf('@')

const isEmailAddress = atCharIndex !== -1
if (!isEmailAddress) {
  console.log('Input is not an email address')
  process.exit(1)
}

const domain = input.slice(atCharIndex + 1)
const url = `http://${domain}`

;(async () => {
  try {
    const data = await scraper.scrape(url, ['phones', 'emails', 'places'])
    console.log(JSON.stringify(data, null, 2))
    process.exit(0)
  } catch (e) {
    console.error(e)
    process.exit(1)
  }
})()
