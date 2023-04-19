import express from 'express';

import { createPayment  } from '../controllers/payment';
export default (router: express.Router) => {
    router.post('/:id',createPayment);
   
}