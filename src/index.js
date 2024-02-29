import express from 'express'
import { randomUUID } from 'node:crypto'

const app = express()

app.use(express.json())

class Message {
  #message = new Map();

  list() {
    return Array.from(this.#message.entries())
    .map((messageArray) => {
      const id = messageArray[0];
      const data = messageArray[1];

      return {
        id,
        ...data,
      };
    })
  }

  create(message) {
    const messageId = randomUUID();
    this.#message.set(messageId, message);
  }
}

const database = new Message

app.get('/message', (request, reply) => {
  const message = database.list()

  return reply.status(200).send(message)
})

app.post('/message', (request, reply) => {
  const { name, content} = request.body

  database.create({
    name,
    content
  })

  return reply.status(201).send("Menssagem em enviada.")
})

app.listen(3333, () => console.log('Server is run in port 3333'))