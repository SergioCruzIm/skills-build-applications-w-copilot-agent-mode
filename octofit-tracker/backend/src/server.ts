import express from 'express'
import { connectDatabase } from './config/database.js'
import apiRouter from './routes/api.js'

const app = express()
const port = Number(process.env.PORT || 8000)

app.use(express.json())
app.use((_request, response, next) => {
  response.header('Access-Control-Allow-Origin', '*')
  response.header('Access-Control-Allow-Headers', 'Content-Type')
  response.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
  next()
})

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', service: 'octofit-tracker-api' })
})

app.use('/api', apiRouter)

app.use((error: unknown, _request: express.Request, response: express.Response, _next: express.NextFunction) => {
  console.error(error)
  response.status(400).json({ error: 'Request could not be processed' })
})

export async function startServer() {
  await connectDatabase()
  return app.listen(port, () => {
    console.log(`OctoFit Tracker API listening on port ${port}`)
  })
}

if (process.env.NODE_ENV !== 'test') {
  startServer().catch((error) => {
    console.error('Error starting OctoFit Tracker API:', error)
    process.exit(1)
  })
}

export default app