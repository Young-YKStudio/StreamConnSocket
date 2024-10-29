const Channel = require('../../models/Channel');
const Post = require('../../models/Post');
const User = require('../../models/User');

const CreatePost = async (request) => {
  
  const { loggedUser, body, channelId } = request
  let foundLoggedUser = await User.findOne({_id: loggedUser._id})
  let foundChannel = await Channel.findOne({_id: channelId})
  let createdPost = await Post.create({body: body, channelId: foundChannel, postOwner: foundLoggedUser})
  foundChannel.posts.push(createdPost)
  await foundChannel.save()
  return createdPost;
}

module.exports = CreatePost;