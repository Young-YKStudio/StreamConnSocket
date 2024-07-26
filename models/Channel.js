const mongoose = require('mongoose')

const ChannelSchema = new mongoose.Schema({
  posts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
  }],

  collarborations: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Collarboration'
  }],

  channelName: {
    type: String,
    required: true
  },

  channelOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },

  channelModerators: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],

  isPrivate: {
    type: Boolean,
    default: false
  },

  channelType: {
    type: String,
    default: 'Text'
  },
}, {timestamps: true})

const Channel = mongoose.model('Channel', ChannelSchema)

module.exports = Channel