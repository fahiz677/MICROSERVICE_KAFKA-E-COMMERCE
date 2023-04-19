import express from 'express';

import { getOrder  } from '../controllers/order';
export default (router: express.Router) => {
    router.get('/',getOrder);
   
}