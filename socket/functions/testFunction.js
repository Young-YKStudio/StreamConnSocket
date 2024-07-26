const User = require('../../models/User')

const testFunction = async (socket, loggedUser) => {

  let foundLoggedUser

  if(loggedUser) {
    foundLoggedUser = await User.findOne({_id: loggedUser._id})
    console.log(foundLoggedUser, 'reached test function')
  }

}

module.exports = testFunction