const casual = require('casual')
const fs = require('fs')
const { v4: uuidv4 } = require('uuid')
const users = require('../src/users.json')

let numberOfMessages = 10
const arg = process.argv.slice(2)[0]

if (!isNaN(arg) && parseInt(arg) > 0) {
  numberOfMessages = parseInt(arg)
}

const messages = [...Array(numberOfMessages)].map(() => {
  const randomText = Math.round(Math.random())
  const text = randomText ? casual.text : casual.sentence
  const randomAuthorId = Math.round(Math.random())
  const authorId = randomAuthorId ? users[0].id : users[1].id
  const data = {
    authorId,
    id: uuidv4(),
    text,
  }
  return data
})

const json = `${JSON.stringify(messages, null, 2)}\n`

fs.writeFile('src/messages.json', json, () => {})
