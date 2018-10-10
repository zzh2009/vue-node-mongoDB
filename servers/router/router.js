var md5 = require("../common/md5.js")
var moment = require("../common/moment.js")
var sendFilter = require("../common/sendFilter.js")
// mongoose数据库
var User = require("../models/User.js")
var ShuoShuo = require("../models/ShuoShuo.js")

exports.index = function(req,res,next){
    res.render("index")
}
// 判断是否登陆
exports.logout = function(req,res,next){
    if(req.session.login == "1"){
        res.send(sendFilter.sendok('',{name:req.session.username}))
    } else {
        res.status(401)
        res.send('false')
    }
}
// 注册用户
exports.regist = function(req,res,next){
    var form = req.body

    //查询数据库中是不是有这个人
    User.find({'name':form.name},function(err,result){
        if (err) {
            res.send(sendFilter.sendfalse('系统错误'))
            return
        }
        if (result.length != 0) {
            res.send(sendFilter.sendfalse('该用户名已经存在'))
            return;
        }
        // 如果是新用户,就添加
        User.count({},function(err,count){
            form.sid = count
            // md5加密
            form.password = md5(md5(form.password) + 'zzh')
            User.create(form,function(){
                console.log("插入成功")
                req.session.login = "1"
                req.session.username = form.name
                res.send(sendFilter.sendok('注册成功'))
            })
        })
    })
}

// 登陆
exports.login = function(req,res,next){
    var form = req.body

    User.find({"name": form.name},function(err,result){
        if(err) {
            res.send(sendFilter.sendfalse('系统错误'))
            return
        }
        if(result.length ==0){
            res.send(sendFilter.sendfalse("用户名不存在"))
            return
        }
        var password = md5(md5(form.password) + "zzh")
        if(password == result[0].password) {
            req.session.login = "1"
            req.session.username = result[0].name
            res.send(sendFilter.sendok('恭喜,登陆成功'))
        } else {
            res.send(sendFilter.sendfalse('密码错误'))
        }
    })
}
// 获取所有用户姓名
exports.allUsername = function(req,res,next){
    // 查找所有用户并返回
    User.find({},function(err,result){
        var allUsername = []
        for(var i = 0;i<result.length;i++){
            allUsername[i]=result[i].name
        }
        res.send(sendFilter.sendok(allUsername))
    })
}
// 接收并插入说说
exports.postShuoshuo = function(req,res,next){
    var form = req.body
    var date = new Date()
    form.date = moment.formatterDateTime(date)
    ShuoShuo.createShuoShuo(form,function(){
        res.send(sendFilter.sendok('提交成功'))
    })
}
// 查找说说列表
exports.getShuoshuo = function(req,res,next){
    var form = req.body
    ShuoShuo.findShuoShuo(form.pageNo,form.pageSize,function(err,result){
        if(err){
            res.send(sendFilter.sendfalse('系统错误'))
            return
        }
        res.send(sendFilter.sendok(result))
    })
}
// 查找说说列表并修改
exports.updateShuoshuo = function(req,res,next){
    var form = req.body
    ShuoShuo.findOne(form,function(err,result){
        ShuoShuo.updateShuoShuo(form,result,function(){
            res.send(sendFilter.sendok())
        })
    })
    
}