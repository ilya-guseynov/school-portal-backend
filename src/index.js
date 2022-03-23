import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import bodyParser from 'body-parser'

import { UserRouter } from './routers/UserRouter.js'
import { GroupRouter } from './routers/GroupRouter.js'

const start = async () => {
  const PORT = 4000

  await mongoose.connect('mongodb://localhost:27017/school_portal_database')

  console.log(`[school-portal-backend]: Connected to mongo database.`)
  const app = express()
  console.log(`[school-portal-backend]: Created express app.`)
  app.use(cors())
  console.log(`[school-portal-backend]: CORS enabled.`)
  app.use(bodyParser.json())
  console.log(`[school-portal-backend]: Body parser enabled.`)

  app.get('/api/v1/test', (_, res) => {
    res.status(200).json({
      success: true,
      data: 'works',
    })
  })
  console.log(`[school-portal-backend]: /api/v1/test - Test route connected.`)

  app.use('/api/v1/user', UserRouter)
  console.log(`[school-portal-backend]: /api/v1/user - User router connected.`)
  app.use('/api/v1/group', GroupRouter)
  console.log(`[school-portal-backend]: /api/v1/group - Group router connected.`)

  app.listen(PORT, () => {
    console.log(`[school-portal-backend]: Server started on port ${ PORT }.`)
  })
}

start()
