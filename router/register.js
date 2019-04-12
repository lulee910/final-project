const express = require("express");
const bodyParser = require('body-parser');
//var session = require('express-session');
var cookieParser = require('cookie-parser');
const register = require("../data/register");

const router = express.Router();
//app.use(cookieParser());
/*app.use(session({
    secret: '12345',
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: true
}));*/

// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({ extended: false })
//var connection = connectMysql.connectMysql();
//app.use(express.static('note-taking'));

router.get("/", async (req, res) =>{
    res.render("sys/main", {flag :true, partial: "register-script"});
});

router.post("/login_post",async (req, res) =>{
   /* let loginInfo = req.body;
    const flag = await register.login(loginInfo.username, loginInfo.passwd);
    if(flag){
       
    }else{

    }*/
    res.render("sys/sysIndex", {flag : false}); 
});

router.post("/register_post",async (req, res) =>{
    /* let loginInfo = req.body;
     const flag = await register.login(loginInfo.username, loginInfo.passwd);
     if(flag){
        
     }else{
 
     }*/
     res.render("sys/sysIndex", {flag : false}); 
 });

module.exports = router;