const mongoose = require('mongoose');

const TestSchema = new mongoose.Schema({
  body: String,
}, {timestamps: true})

const Test = mongoose.model('Test', TestSchema)

module.exports = Test