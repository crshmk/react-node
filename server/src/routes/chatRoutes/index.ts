import express from 'express'

import testRoute from './testRoute'

const chatRouter = express.Router()

chatRouter.get('test', testRoute)

export default chatRouter