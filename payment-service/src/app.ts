
import express from 'express';
import mongoose, {ConnectOptions } from 'mongoose';
import router from './routes/index';

const  app = express();

app.use(express.json());

mongoose.connect('mongodb://localhost/payment-service', {} as ConnectOptions).then(() => {console.log('Paymnet-Service DB Connected');
});

app.use('/payment', router());

app.listen(8082, ()=> {
    console.log('Server running on http://localhost:8082/');
    
});

