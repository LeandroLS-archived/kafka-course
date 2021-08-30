const express = require('express')
const app = express()
const port = 3000
const { Kafka } = require('kafkajs')

app.get('/teste', (req, res) => {
    res.send('Olá, estou funcionando :D')
})

app.post('/order', async (req, res) => {
    const kafka = new Kafka({
        clientId: 'my-app',
        brokers: ['kafka:9092']
    })

    const producer = kafka.producer()
    await producer.connect()
    await producer.send({
        topic: 'ECOMMERCE_NEW_ORDER',
        messages: [
            { value: 'New order created' },
        ],
    })
    await producer.send({
        topic: 'ECOMMERCE_SEND_EMAIL',
        messages: [
            { value: 'We are processing your order' },
        ],
    })
    await producer.disconnect()
    res.send('Mensagem enviada');
})

app.get('/order/messages', async (req, res) => {
    const kafka = new Kafka({
        clientId: 'my-app',
        brokers: ['kafka:9092']
    })
    const consumer = kafka.consumer({ groupId: 'test-group' })

    await consumer.connect()
    await consumer.subscribe({ topic: 'ECOMMERCE_NEW_ORDER', fromBeginning: true })
    await consumer.run({

        eachMessage: async ({ topic, partition, message }) => {
            console.log('MENSAGEM')
            console.log({
                value: message.value.toString(),
            })
        },
    }).catch(e => console.log('DEU RUIM', e))
    res.send('mensagem foi de boas')
})

app.listen(port, () => {
    console.log(`Kafka course server listening at http://localhost:${port}`)
})