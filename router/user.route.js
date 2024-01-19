import express from 'express'
import {verifyToken} from '../utils/verifyUser.js'
import { updateuser, deleteUser, getUserblogg, getuser } from '../controller/user.controller.js'

const router = express.Router()

router.patch('/updateuser/:id', verifyToken, updateuser)
router.delete('/deleteuser/:id', verifyToken, deleteUser)
router.get('/getuserblogg/:id', verifyToken, getUserblogg)
router.patch('/:id', verifyToken, getuser)

export default router