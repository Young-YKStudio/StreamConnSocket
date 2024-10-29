const testFunction = require('./functions/testFunction')
const getPostRequest = require('./functions/getPost')
const CreatePost = require('./functions/createPost')
const CreateComment = require('./functions/createComment')

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

    socket.on('createPost', async (receivedData) => {
      let createdPost = await CreatePost(receivedData)
      if(createdPost){
        let channelData = await getPostRequest(receivedData.channelId)
        io.emit('getPostsReturn', channelData)
      }
    })

    socket.on('replySubmit', async (receivedData) => {
      let createdComment = await CreateComment(receivedData)
      if(createdComment){
        let channelData = await getPostRequest(receivedData.channelId)
        io.emit('getPostsReturn', channelData)
      }
    })

  })
}