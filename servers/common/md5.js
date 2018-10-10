var crypto = require("crypto")
// 加密函数
module.exports = function (minma){
    var md5 = crypto.createHash('md5')
    var password = md5.update(minma).digest('base64')
    
    return password
}