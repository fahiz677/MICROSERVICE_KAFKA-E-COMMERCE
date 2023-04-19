import express from 'express';
import { OrderModel } from '../model/orderSchema';
import { KafkaConsumer } from '../events/consumer';
import { KafkaProducer } from '../events/producer';



export const listeningFunction =async () => {
    try {
        const orderConsumer = new KafkaConsumer("ordergroup");

        orderConsumer.connectConsumer('buyProduct').then(async(product:string)=>{
            const { products, userEmail, total  } = JSON.parse(product);
console.log("hello",product);

            const newOrder = new OrderModel({
                products,
                user: userEmail,
                total_price: total,
            }); 
// console.log("new",newOrder);

            await newOrder.save();

            // orderConsumer.stopConsumer;

        })


        // const paymentConsumer = new KafkaConsumer("paymentgroup");

        // paymentConsumer.connectConsumer('payment').then(async(payment:string | undefined)=>{
        //     const paymentStatus = JSON.parse(payment);
            
        //     const { orderId, status} = paymentStatus;

        //     if(typeof payment === 'string') {

        //         await OrderModel.findByIdAndUpdate({_id: orderId},{payment: status});

        //         const paymentProducer = new KafkaProducer();

        //         const topic = "paymentResult";

        //         await paymentProducer.connectProducer(topic, "true");


        //     }
    
        //     paymentConsumer.stopConsumer;
        // })
    } catch (error) {
        console.error(error);
    }

}

export const getOrder = async(req: express.Request, res: express.Response) => {
    try {
        const allOrder = await OrderModel.find();
        console.log(allOrder);
        
        res.send(allOrder)
    } catch (error) {
        console.error(error);
        
        res.sendStatus(500);
    }
}