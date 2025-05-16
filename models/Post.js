const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
  body: String,

  channelId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Channel',
  },

  postOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    autopopulate: true
    // autopopulate: { select: 'nickname', select:'profile' },
  },

  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment',
    autopopulate: true
  }],
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    autopopulate: { select: 'nickname' },
  }]
},{timestamps: true})

PostSchema.plugin(require('mongoose-autopopulate'))

const Post = mongoose.model('Post', PostSchema)

module.exports = Post