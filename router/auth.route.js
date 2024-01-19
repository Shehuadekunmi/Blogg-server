import express, { Router } from 'express'
import { signin, signup, signout } from '../controller/auth.controller.js';


const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/signout', signout);


export default router
