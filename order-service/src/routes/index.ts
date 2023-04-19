import express from 'express';
import order from './order';

const router = express.Router();

export default (): express.Router => {
    order(router);

    return router;
}