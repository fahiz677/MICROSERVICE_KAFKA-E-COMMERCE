import express from 'express';
import { KafkaProducer } from '../events/producer';
import { KafkaConsumer } from '../events/consumer';


export  const createPayment =async (req:express.Request,res:express.Response) => {
    try {
        const orderId = req.params;

        const topic = "payment"

        const producer = new KafkaProducer();

        await producer.connectProducer(JSON.stringify({orderId, status: true}), topic);

        const consumer = new KafkaConsumer("groupPayment"); 

        await consumer.connectConsumer("paymentSuccess").then((paymentStatus:boolean | unknown) => {

            if(paymentStatus !== Boolean) res.sendStatus(403).send("paymentFailureBecauseOfCommunicationError");

            if (paymentStatus === true) res.sendStatus(200).send("paymentSuccess");

            if(paymentStatus === false) res.sendStatus(404).send("paymentFailure");
              
        })    
    } catch (error) {
        console.error(error);
        
        res.sendStatus(500);

    }
}