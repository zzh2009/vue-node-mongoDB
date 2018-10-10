/**
 * Created 2018/2/28 10:31
 */
var mongoose = require('mongoose')

// schema
var shuoShuoSchema = new mongoose.Schema({
    "sid" : Number,
    "name" : String,
    "content" : String,
    "zan" : Number,
    "date" : String
})

// 创建静态方法
// 插入说说
shuoShuoSchema.statics.createShuoShuo = function(message, callback) {
    return this.model('ShuoShuo').create(message, callback);
}
// 查找说说
shuoShuoSchema.statics.findShuoShuo = function(pageNo, pageSize , callback) {
    return  this.model('ShuoShuo').find()
    .sort({'date': -1})
    .skip((pageNo - 1 ) * pageSize)
    .limit(pageSize)
    .exec(callback)
}
// 查找说说并修改
shuoShuoSchema.statics.updateShuoShuo = function(date,result, callback) {
    var zans = result.zan+1
    return this.model('ShuoShuo').update(date,{$set:{"zan": zans}},{},callback);
}

// 建立索引
shuoShuoSchema.index({"sid": 1})

// model
var ShuoShuo = mongoose.model("ShuoShuo",shuoShuoSchema)

module.exports = ShuoShuo



