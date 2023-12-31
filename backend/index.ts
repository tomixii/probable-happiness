import cors from 'cors'
import express, { Express } from 'express'
import audit from 'express-requests-logger'

import itemsRouter from './routes/items'
import recycleRouter from './routes/recycle'
const app: Express = express()

app.use(express.json({ limit: '50mb' }))

const port = process.env.PORT || 8080

app.use(cors())
app.use('/items', itemsRouter)
app.use('/recycle', recycleRouter)
app.use(
  audit({
    logger: console,
  })
)

app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`)
})
