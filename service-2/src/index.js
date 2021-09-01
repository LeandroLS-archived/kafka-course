const { Kafka } = require('kafkajs')
const kafka = new Kafka({
    clientId: 'service-2',
    brokers: ['kafka:9092']
})
const consumer = kafka.consumer({ groupId: 'service-group-2' })
async function run() {
    await consumer.connect()
    await consumer.subscribe({ topic: 'ECOMMERCE_SEND_EMAIL', fromBeginning: true })
    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            console.log('MENSAGEM')
            console.log({
                value: message.value.toString(),
            })
        },
    }).catch(e => console.log('DEU RUIM', e))
}
run().catch(console.error)
console.log('mensagem chegou de boas')