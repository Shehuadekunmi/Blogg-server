import express from 'express'
import { createblogg, deleteblogg, getBlogg, getBloggs, updateblogg } from '../controller/blogg.controller.js'
import {verifyToken} from '../utils/verifyUser.js'

const router = express.Router()

router.post('/createblogg', verifyToken,  createblogg)
router.get('/getblogg/:id', verifyToken,  getBlogg)
router.get('/getbloggs', verifyToken,  getBloggs)
router.patch('/update/:id', verifyToken,  updateblogg)
router.delete('/delete/:id', verifyToken,  deleteblogg)

export default router;