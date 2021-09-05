const { Kafka } = require('kafkajs')
const kafka = new Kafka({
    clientId: 'email-service',
    brokers: ['kafka:9092']
})
const consumer = kafka.consumer({ groupId: 'email-service-group' })
async function run() {
    await consumer.connect()
    await consumer.subscribe({ topic: 'ECOMMERCE_SEND_EMAIL', fromBeginning: true })
    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            console.log('Send email')
            console.log({
                value: message.value.toString(),
            })
            console.log('Email sent')
        },
    }).catch(e => console.log('DEU RUIM', e))
}
run().catch(console.error)
console.log('mensagem chegou de boas')