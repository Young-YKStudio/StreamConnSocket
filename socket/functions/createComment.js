const User = require('../../models/User');
const Post = require('../../models/Post');
const Comment = require('../../models/Comment');

const CreateComment = async (request) => {
  const { channelId, loggedUser, body, replyTo } = request

  console.log('1')
  // 1. find logged user
  let foundLoggedUser = await User.findOne({_id: loggedUser._id})

  // 1. find post
  let foundPost = await Post.findOne({_id: replyTo._id})

  // 2. create comment
  let createdComment = await Comment.create({body: body, postId: foundPost, commentOwner: foundLoggedUser})

  if(!createdComment) {
    return false
  }

  foundPost.comments.push(createdComment)

  try {
    await foundPost.save()
  } catch (err) {
    return false
  }

  console.log(foundPost, 'at socket')

  return true
}

module.exports = CreateComment;