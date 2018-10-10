/**
 * Created 2017/12/19 17:35
 */
var mongoose = require('mongoose')

// schema
var userSchema = new mongoose.Schema({
    "sid" : Number,
    "name" : String,
    "password" : String
})
// 索引
userSchema.index({"sid": 1})

// model
var User = mongoose.model("User",userSchema)

module.exports = User



