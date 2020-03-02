const casual = require('casual')
const fs = require('fs')
const uuidv4 = require('uuid/v4')

let numberOfMessages = 10
const arg = process.argv.slice(2)[0]

if (!isNaN(arg) && parseInt(arg) > 0) {
  numberOfMessages = parseInt(arg)
}

const messages = [...Array(numberOfMessages)].map(() => {
  const random = Math.round(Math.random())
  const text = random ? casual.text : casual.sentence
  const data = {
    id: uuidv4(),
    text,
  }
  return data
})

const json = `${JSON.stringify(messages, null, 2)}\n`

fs.writeFile('src/messages.json', json, () => {})
