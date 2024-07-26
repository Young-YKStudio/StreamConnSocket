const testFunction = require('./functions/testFunction')
const getPostRequest = require('./functions/getPost')

exports.connection = (io) => {
  io.on('connection', (socket) => {
    console.log('a user connected')
  
    socket.on('disconnect', () => {
      console.log('user disconnected')
    })

    socket.on('test', (socket, loggedUser) => {
      testFunction(loggedUser)
    })

    socket.on('getPosts', async (channel) => {
      let channelData = await getPostRequest(channel)
      io.emit('getPostsReturn', channelData)
    })

  })
}