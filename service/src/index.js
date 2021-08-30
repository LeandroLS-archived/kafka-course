const { Kafka } = require('kafkajs')
const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['kafka:9092']
})
const consumer = kafka.consumer({ groupId: 'test-group' })
async function run() {
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
}
run().catch(console.error)
console.log('mensagem chegou de boas')