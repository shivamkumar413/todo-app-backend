import express from 'express';
import { logoutController, signInController, signupController } from '../../controllers/user.controller.js';
import { isAuthenticated } from '../../middlewares/auth.middlewares.js';

const router = express.Router();

router.post('/signin',signInController);
router.post('/signup',signupController);
router.post('/logout',isAuthenticated,logoutController)

export default router;