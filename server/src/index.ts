import 'dotenv/config'

import app from './app'

const port = Number(process.env.API_PORT ?? 3001)

app.listen(port, '127.0.0.1', () => {
  console.log('api at', port)
})

export default app