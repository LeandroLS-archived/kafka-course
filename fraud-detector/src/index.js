const { Kafka } = require('kafkajs')
const kafka_1 = new Kafka({
    clientId: 'fraud-detector-1',
    brokers: ['kafka:9092']
})
const kafka_2 = new Kafka({
    clientId: 'fraud-detector-2',
    brokers: ['kafka:9092']
})
const consumer_1 = kafka_1.consumer({ groupId: 'group-fraud-detector' })
const consumer_2 = kafka_2.consumer({ groupId: 'group-fraud-detector' })
const consumerArr = [consumer_1, consumer_2]
async function run(consumerArr) {
    consumerArr.forEach(async (consumer) => {
        await consumer.connect()
        await consumer.subscribe({ topic: 'ECOMMERCE_NEW_ORDER', fromBeginning: true })
        await consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                console.log('---------- Fraud Detector ------')
                console.log('Processing new order, cheking for fraud')
                console.log(`Partition ${partition}`)
                console.log(`Topic ${topic}`)
                console.log(`Message ${message.value.toString()}`)
                console.log(`Key: ${message.key.toString()}`)
                console.log('Order processed')
            },
        }).catch(e => console.log('DEU RUIM', e))
    });
}
run(consumerArr).catch(console.error)