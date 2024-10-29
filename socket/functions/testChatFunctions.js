const Test = require('../../models/Test')

const testChatFunctions = async (type) => {

  console.log(type, 'at function')

  if(type === 'initialConnection') {
    const getAllChat = await Test.find()
  
    return getAllChat
  }

  
  const newChatData = await Test.create({body: type})
  
  const getAllChat = await Test.find()

  return getAllChat

}

module.exports = testChatFunctions