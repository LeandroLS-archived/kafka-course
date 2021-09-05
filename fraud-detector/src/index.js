const { Kafka } = require('kafkajs')
const kafka = new Kafka({
    clientId: 'fraud-detector',
    brokers: ['kafka:9092']
})
const consumer = kafka.consumer({ groupId: 'group-fraud-detector' })
async function run() {
    await consumer.connect()
    await consumer.subscribe({ topic: 'ECOMMERCE_NEW_ORDER', fromBeginning: true })
    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            console.log('Processing new order, cheking for fraud')
            console.log({
                value: message.value.toString(),
            })
            console.log('Order processed')
        },
    }).catch(e => console.log('DEU RUIM', e))
}
run().catch(console.error)