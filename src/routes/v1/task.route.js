import express from 'express'
import { isAuthenticated }from './../../middlewares/auth.middlewares.js'
import { createTaskController, deleteManyTaskController, deleteTaskByIdController, getAllTaskController, updateTaskController } from '../../controllers/task.controller.js';

const router = express.Router();

router.get('/',isAuthenticated,getAllTaskController);
router.post('/',isAuthenticated,createTaskController);
router.put('/:taskId',isAuthenticated,updateTaskController);
router.delete('/:taskId',isAuthenticated,deleteTaskByIdController);
router.delete('/multiple',isAuthenticated,deleteManyTaskController);

export default router;