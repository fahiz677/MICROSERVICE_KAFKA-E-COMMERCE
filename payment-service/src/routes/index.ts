import express from 'express';
import payment from './payment';

const router = express.Router();

export default (): express.Router => {
    payment(router);

    return router;
}