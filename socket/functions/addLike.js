const Post = require('../../models/Post')
const User = require('../../models/User')

const AddLike = async (request) => {
  
  let foundLoggedUser = await User.findOne({_id: request.user._id})
  let foundPost = await Post.findOne({_id: request.post._id})
  
  if(!foundLoggedUser || !foundPost) {
    return false
  }
  
  foundPost.likes.push(foundLoggedUser._id)
  
  await foundPost.save()
  return foundPost
}

module.exports = AddLike