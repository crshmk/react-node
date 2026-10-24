import cookieParser from 'cookie-parser'
import express from 'express'
import helmet from 'helmet'

import router from './router'

const app = express()

app.use(express.json({ limit: '1mb' }))
app.use(cookieParser())
app.use(helmet())

app.use('/api/v1', router)

export default app