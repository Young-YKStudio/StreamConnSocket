const Channel = require('../../models/Channel')
const Post = require('../../models/Post')
const Comment = require('../../models/Comment')

const getPostRequest = async (channel) => {
  if(channel) {
    let foundChannel = await Channel.findOne({_id: channel}).populate('posts')
    return foundChannel
  }
}

module.exports = getPostRequest