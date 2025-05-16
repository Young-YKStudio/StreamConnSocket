const Post = require('../../models/Post')
const User = require('../../models/User')

const RemoveLike = async (request) => {

  let foundLoggedUser = await User.findOne({_id: request.user._id})
  let foundPost = await Post.findOne({_id: request.post._id})

  if(!foundLoggedUser ||!foundPost) {
    return false
  }

  let filteringLikes = async (likes) => {
    let filteredLikes = []
    let totlaNum = likes.length
    let countNum = 0
    for (let i = 0; i < likes.length; i++) {
      let likedUserInLikes = await User.findOne({_id: likes[i]._id})
      if(likedUserInLikes) {
        if(likedUserInLikes.email !== foundLoggedUser.email) {
          filteredLikes.push(likes[i])
          countNum ++
        } else {
          countNum ++
        }
      } else {
        countNum ++
      } 
    }
    if(totlaNum === countNum) {
      return filteredLikes
    }
  }

  let filteredResult = await filteringLikes(foundPost.likes)
  
  if(filteredResult) {
    foundPost.likes = filteredResult
    await foundPost.save()
    return foundPost
  } else {
    return false
  }
}

module.exports = RemoveLike