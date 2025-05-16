const testFunction = require('./functions/testFunction')
const getPostRequest = require('./functions/getPost')
const CreatePost = require('./functions/createPost')
const CreateComment = require('./functions/createComment')
const testChatFunctions = require('./functions/testChatFunctions')
const AddLike = require('./functions/addLike')
const RemoveLike = require('./functions/removeLike')

exports.connection = (io) => {
  io.on('connection', (socket) => {
    console.log('a user connected')
  
    socket.on('disconnect', () => {
      console.log('user disconnected')
    })

    socket.on('test', (socket, loggedUser) => {
      testFunction(loggedUser)
    })

    socket.on('testChat', async (req) => {
      console.log('chat connected', req)
      // if recieved request is initial, 
      if(req === 'initialConnection') {
        // return collected chat data
        const chatData = await testChatFunctions(req)
        socket.emit("testChat", chatData);
      } else {
        const chatInputData = await testChatFunctions(req)
        socket.broadcast.emit("testChat", chatInputData);
        // if recieved request is not initial
        // register new chat to DB
        // wait for return from DB
        // return with updated chat data
      }

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

    socket.on('AddLike', async(receivedData) => {
      let likeAdded = await AddLike(receivedData)
      if(likeAdded){
        let channelData = await getPostRequest(receivedData.channel)
        io.emit('getPostsReturn', channelData)
      }
    })

    socket.on('RemoveLike', async(receivedData) => {
      let likeRemoved = await RemoveLike(receivedData)
      if(likeRemoved) {
        let channelData = await getPostRequest(receivedData.channel)
        io.emit('getPostsReturn', channelData)
      }
    })

  })
}