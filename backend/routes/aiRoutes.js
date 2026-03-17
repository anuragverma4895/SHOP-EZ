import express from 'express';
import {
    getSimilarProducts,
    getCustomersAlsoBought,
    getTrendingProducts
} from '../controllers/aiController.js';

const router = express.Router();

router.get('/trending', getTrendingProducts);
router.get('/:id/similar', getSimilarProducts);
router.get('/:id/also-bought', getCustomersAlsoBought);

export default router;
