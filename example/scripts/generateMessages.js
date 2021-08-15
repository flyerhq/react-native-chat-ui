const casual = require('casual')
const fs = require('fs')
const { v4: uuidv4 } = require('uuid')

const users = [
  {
    firstName: 'John',
    id: 'b4878b96-efbc-479a-8291-474ef323dec7',
    imageUrl: 'https://avatars.githubusercontent.com/u/14123304?v=4',
  },
  {
    firstName: 'Jane',
    id: '06c33e8b-e835-4736-80f4-63f44b66666c',
    imageUrl: 'https://avatars.githubusercontent.com/u/33809426?v=4',
  },
]

let numberOfMessages = 10
const arg = process.argv.slice(2)[0]

if (!isNaN(arg) && parseInt(arg) > 0) {
  numberOfMessages = parseInt(arg)
}

const messages = [...Array(numberOfMessages)].map((_, index) => {
  const randomText = Math.round(Math.random())
  const text = randomText ? casual.text : casual.sentence
  const randomAuthor = Math.round(Math.random())
  const author = randomAuthor ? users[0] : users[1]
  const createdAt = Date.now() - index
  const data = {
    author,
    createdAt,
    id: uuidv4(),
    status: 'seen',
    text,
    type: 'text',
  }
  return data
})

const json = `${JSON.stringify(messages, null, 2)}\n`

fs.writeFile('src/messages.json', json, () => {
  console.log(`Generated ${numberOfMessages} messages`)
})
