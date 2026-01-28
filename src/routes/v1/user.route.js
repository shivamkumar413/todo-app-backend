import express from 'express';
import { signInController, signupController } from '../../controllers/user.controller.js';

const router = express.Router();

router.post('/signin',signInController);
router.post('/signup',signupController);

export default router;