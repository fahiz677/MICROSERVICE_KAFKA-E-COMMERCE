import express from "express";
import { OrderModel } from "../model/orderSchema";
import { KafkaConsumer } from "../events/consumer";
import { KafkaProducer } from "../events/producer";
import { emitter } from "../eventEmitter";

export const listeningFunction = async () => {
  try {
    const orderConsumer = new KafkaConsumer("ordergroup");

    orderConsumer.connectConsumer("buyProduct").then(async (product: any) => {
        emitter.on("buyProduct", async(data) => {
            const { name,description, price } =data;

            const newOrder = new OrderModel({
                name,
                total_price: price,
                payment:false,
            });
            newOrder.save();
      
    });
    });


    const paymentConsumer = new KafkaConsumer("paymentgroup");

    paymentConsumer.connectConsumer('payment').then(async()=>{

        emitter.on("payment", async(payment)=>{
            const { orderId, status} = payment;
    console.log(payment);
    
    
                await OrderModel.findByIdAndUpdate(orderId, {payment:status});
    
                const paymentProducer = new KafkaProducer();
    
                const topic = "paymentResult";
    
                await paymentProducer.connectProducer(topic, "true");
    
    
        })
        

    })

  } catch (error) {
    console.error(error);
  }
};
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

