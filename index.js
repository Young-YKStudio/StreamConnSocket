require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server)
const socketUtils = require('./socket/socketUtils')

app.use(cors())
const connectDB = require('./config/db')
app.get('/', (req, res) => {
  res.send('socket server running')
})

connectDB()

// IO Starts here
socketUtils.connection(io)

let PORT = process.env.PORT || 4000
server.listen(PORT, () => {
  console.log(`listening on ${PORT}`)
})