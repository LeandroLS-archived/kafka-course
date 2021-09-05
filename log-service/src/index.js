const { Kafka } = require('kafkajs')
const kafka = new Kafka({
    clientId: 'log-service',
    brokers: ['kafka:9092']
})
const consumer = kafka.consumer({ groupId: 'log-service-group' })
async function run() {
    await consumer.connect()
    await consumer.subscribe({ topic: 'ECOMMERCE_NEW_ORDER', fromBeginning: true })
    await consumer.subscribe({ topic: 'ECOMMERCE_SEND_EMAIL', fromBeginning: true })
    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            console.log('Logs')
            console.log({
                value: message.value.toString(),
            })
        },
    }).catch(e => console.log('DEU RUIM', e))
}
run().catch(console.error)