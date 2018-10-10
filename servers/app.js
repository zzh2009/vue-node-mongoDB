var express = require("express")
var session = require("express-session")
var router = require("./router/router.js")
var db = require("./common/db.js");
var bodyParser = require('body-parser');
var swig = require('swig');
var bodyParser = require('body-parser')

var app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// 模板引擎
//第一个参数：模板引擎的名称，同时也是模板文件的后缀,第二个参数解析模板内容的方法
app.engine('html', swig.renderFile);
//设置文件存放目录，第一个参数必须是views，第二个参数是目录
app.set('view engine', 'html');

// 静态页面
app.use(express.static("./public"))

// 使用session
app.use(session({
    secret:'keyboard cat',
    resave: false,
    saveUninitialized: true
}))

app.get("/",router.index)
app.get("/logout",router.logout)
app.post("/regist",router.regist)//注册
app.post("/login",router.login)//登陆
app.get("/allUsername",router.allUsername)//所有用户姓名
app.post("/postShuoshuo",router.postShuoshuo)//插入说说
app.post("/getShuoshuo",router.getShuoshuo)//查找说说列表
app.post("/updateShuoshuo",router.updateShuoshuo)//修改说说列表

app.listen(3080)






