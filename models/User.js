const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: false
  },
  follows: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  followers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  introduction: String,
  isUpdated: {
    type: Boolean,
    default: false,
  },
  profile: String,
  locale: String,
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isStreamer: Boolean,
  platforms: [
    {
      name: String,
      href: String,
    }
  ],
  nickname: {
    type: String,
    unique: true,
  },
  blockedUsers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  moderators: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    }
  ],
  channels: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Channel'
    }
  ],
  connects: [
    {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
  ],
  uploadedFiles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Upload'
    }
  ],
  invitationSent: [
    {
      collaboInvitation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CollaboInvitation'
      },
      collaboEvent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Collarboration'
      },
      invitationSentTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      status: {
        type: String,
        default: 'pending'
      }
    }
  ],
  invitationReceived: [
    {
      collaboInvitation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CollaboInvitation'
      },
      collaboEvent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Collarboration'
      },
      invitationReceivedFrom: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      status: {
        type: String,
        default: 'pending'
      }
    }
  ],
}, {timestamps: true})

const User = mongoose.model('User', UserSchema)

module.exports = User