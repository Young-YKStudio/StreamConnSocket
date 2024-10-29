const Channel = require('../../models/Channel')
const Post = require('../../models/Post')
const Comment = require('../../models/Comment')

const getPostRequest = async (channel) => {
  if(channel) {
    let foundChannel = await Channel.findOne({_id: channel}).populate('posts')
    let posts = foundChannel.posts
    let sortedPosts = posts.sort((a, b) => b.createdAt - a.createdAt)
    return sortedPosts
  }
}

module.exports = getPostRequest