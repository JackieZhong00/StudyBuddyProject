import express from 'express'
import http from 'http'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compression from 'compression'
import cors from 'cors'
import mongoose from 'mongoose'
import router from '../router'

require('dotenv').config()
const port = process.env.PORT || 8080

const app = express()

app.use(
  cors({
    credentials: true,
    origin: true
  })
)

app.use(compression())
app.use(cookieParser())
app.use(bodyParser.json({limit: '20mb'}))
app.use(bodyParser.urlencoded({ limit: '20mb', extended: true }))


const server = http.createServer(app)

const uri = process.env.MONGO_URL

server.listen(port, () => {
  console.log('server running on server http://localhost:8080/')
})


mongoose.Promise = Promise
// mongoose.connect(MONGO_URL)
mongoose.connect(uri)
mongoose.connection.on('error', (error: Error) => {
  console.log(error)
})


app.use('/', router())

