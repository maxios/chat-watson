import express from 'express';
import watsonRouter from './watson.route';

const router = express.Router()
router.get('/status', (req, res) => { res.send({status: 'OK'})}) // api status
router.use('/watson', watsonRouter) // mount auth paths

export default router;
