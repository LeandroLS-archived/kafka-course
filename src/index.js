const express = require('express')
const app = express()
const port = 3000
const { Kafka } = require('kafkajs')

app.get('/teste', (req, res) => {
    res.send('Olá, estou funcionando :D')
})

app.post('/produz-mensagem', async (req, res) => {
    const kafka = new Kafka({
        clientId: 'my-app',
        brokers: ['localhost:19092']
    })

    const producer = kafka.producer()
    await producer.connect()
    await producer.send({
        topic: 'meu_topico_teste',
        messages: [
            { value: 'Hello KafkaJS user!' },
        ],
    })
    await producer.disconnect()
    res.send('Mensagem enviada');
})

app.listen(port, () => {
    console.log(`Kafka course server listening at http://localhost:${port}`)
})