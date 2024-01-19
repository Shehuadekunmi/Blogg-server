import express from 'express'
import { verifyToken } from '../utils/verifyUser.js';
import { createComment, deleteComment, updateComment, getComment } from '../controller/comment.Controller.js'
const router = express.Router();


router.post('/create', verifyToken, createComment);
router.patch('/update/:id', verifyToken, updateComment);
router.delete('/delete/:id', verifyToken, deleteComment);
router.get('/blog/:blogId', verifyToken, getComment)


export default router