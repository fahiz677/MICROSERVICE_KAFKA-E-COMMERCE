import express from 'express';
import { OrderModel } from './model/orderSchema';
import { listeningFunction } from './controllers/order'
import mongoose, {ConnectOptions } from 'mongoose';
import router from './routes/index';

const  app = express();

app.use(express.json());

mongoose.connect('mongodb://localhost/order-service', {} as ConnectOptions).then(() => {console.log('Order-Service DB Connected');
});

app.use('/order', router());

listeningFunction().then(() => {

    app.listen(8081, ()=> {
        console.log('Server running on http://localhost:8081/');
        
    });

})


