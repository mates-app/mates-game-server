
var mongoose = require('mongoose')
var Schema = mongoose.Schema

var userSchema = {
  username: {type : String, required : true}
}

module.exports = mongoose.model('User', userSchema)
