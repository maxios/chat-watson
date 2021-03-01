import path from 'path';
import express from 'express';
import cors from 'cors'
import helmet from 'helmet'
import bodyParser from 'body-parser'
import apiRouter from '../api'

require('dotenv').config({ path: '../../.env' }) // load .env file

const app = express()
app.use(bodyParser.json())
app.use(cors({ exposedHeaders: ['x-user'] }))
app.use(helmet())
app.use(express.static('public'))

// passport

app.use('/api', apiRouter)

export const start = app => {
  app.listen(3000, (err) => {
    if (err) {
      console.log(`Error : ${err}`)
      process.exit(-1)
    }

    console.log(`the server is running on 3000`)
  })
}

export default app;
