import express from "express";
import { KafkaProducer } from "../events/producer";
import { ProductModel } from "../model/productSchema";

export const createProduct = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { name, description, price } = req.body;

    const newProduct = new ProductModel({
      name,
      description,
      price,
    });

    await newProduct.save();

     res.status(200).json(newProduct)
  } catch (error) {
    console.error(error);

    res.sendStatus(500);
  }
};

export const buyProduct = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const id = req.params?.id;

    const product = await ProductModel.findById({ _id: id });

    const topic = "buyProduct";

    const producer = new KafkaProducer();

    producer.connectProducer(topic, JSON.stringify(product));
    res.status(200);  
    res.send(product);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};
