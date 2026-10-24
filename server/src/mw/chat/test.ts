import type { RequestHandler } from 'express'

const testChat: RequestHandler = (req, res) => {
  res.json({ success: true })
}

export default testChat