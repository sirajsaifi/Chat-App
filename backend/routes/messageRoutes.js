import express from "express"
import { getMessages, sendMessage } from "../controllers/messageController.js"
import protectRoutes from "../middleware/protectRoutes.js"

const router = express.Router()

router.use(protectRoutes)

router.route('/:id').get(getMessages).post(sendMessage)
// router.get('/:id', getMessages)
// router.post('/send/:id', sendMessage)

export default router