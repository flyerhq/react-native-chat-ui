const casual = require('casual')
const fs = require('fs')
const { v4: uuidv4 } = require('uuid')

const users = [
  { id: '06c33e8b-e835-4736-80f4-63f44b66666c', name: 'Alex' },
  { id: '8c72d647-8c5d-4248-b195-e24a4372ea3d', name: 'Daria' },
  { id: 'b195-e23f-8c72-e24a4372ea3d-8c5d-4248', name: 'Vitalii' },
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
  const author = randomAuthor ? users[0].id : users[1].id
  const createdAt = Date.now() - index
  const data = {
    author,
    id: uuidv4(),
    status: 'seen',
    text,
    createdAt,
    type: 'text',
  }
  return data
})

const json = `${JSON.stringify(messages, null, 2)}\n`

fs.writeFile('src/messages.json', json, () => {
  console.log(`Generated ${numberOfMessages} messages`)
})
