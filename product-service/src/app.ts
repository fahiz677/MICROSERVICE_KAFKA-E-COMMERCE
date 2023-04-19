import express from 'express';
import { kafkaclass } from './events/consumer';
import { KafkaProducer } from './events/producer';
import { ProductModel } from './model/productSchema';
import mongoose, {ConnectOptions } from 'mongoose';
import router from './routes/index';

const  app = express();

app.use(express.json());

mongoose.connect('mongodb://localhost/product-service', {} as ConnectOptions).then(() => {console.log('Product-Service DB Connected');
});

app.use('/product', router());

app.listen(8080, ()=> {
    console.log('Server running on http://localhost:8080/');
    
});

