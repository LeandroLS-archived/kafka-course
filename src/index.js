const { Kafka } = require('kafkajs')

const main = async () => {
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
}
console.log('passei aqui')
main()
