// 发送数据处理
exports.sendok = function (message,data){
    return {
        message: message,
        data: data,
        result: 'ok'
    }
}
exports.sendfalse = function (message,data){
    return {
        message: message,
        data: data,
        result: 'false'
    }
}