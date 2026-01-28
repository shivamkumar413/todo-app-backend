import express from 'express';
import authRouter from './user.route.js'

const router = express.Router();

router.use('/auth',authRouter)


export default router;