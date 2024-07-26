const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  body: String,

  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
  },

  commentOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    autopopulate: { select: 'nickname' },
  },
}, {timestamps: true})

CommentSchema.plugin(require('mongoose-autopopulate'))

const Comment = mongoose.model('Comment', CommentSchema)

module.exports = Comment