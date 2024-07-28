const PORT = process.env.PORT || 3000
// const INDEX = './index.html'

const socketIO = require('socket.io')
const express = require('express')

const app = express()
const server = app.listen(PORT, () => {
  console.log('SERVER LISTENING ON PORT http://localhost:3000')
})
const io = socketIO(server)

// app.get('/', (req, res) => {
//   res.sendFile(INDEX, { root: __dirname })
// })

io.on('connection', (socket) => {
  console.log('Client connected')
  socket.on('disconnect', () => console.log('Client disconnected'))
})