import express from 'express';
import { signInController, signupController } from '../../controllers/user.controller.js';

const router = express.Router();

router.get('/signin',signInController);
router.get('/signup',signupController)

export default router;