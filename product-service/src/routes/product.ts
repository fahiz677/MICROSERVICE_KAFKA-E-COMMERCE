import express from 'express';

import { createProduct, buyProduct  } from '../controllers/product';
export default (router: express.Router) => {

    router.post('/create',createProduct);
    router.get('/buy/:id',buyProduct);
   
}