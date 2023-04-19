import express from 'express';
import { KafkaProducer } from '../events/producer';
import { KafkaConsumer } from '../events/consumer';



export  const createPayment =async (req:express.Request,res:express.Response) => {
    try {
        const orderId = req.params?.id;

        const topic = "payment"

        const producer = new KafkaProducer();

        await producer.connectProducer(topic, JSON.stringify({orderId, status: true}));
        
        res.sendStatus(200);
    } catch (error) {
        console.error(error);
        
        res.sendStatus(500);

    }
}