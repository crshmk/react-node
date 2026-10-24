import express from 'express'

import chatRoutes from '@routes/chatRoutes'

const router = express.Router()

router.get('/ping', (req, res) => res.send('pong'))

router.use('/chat', chatRoutes)

export default router