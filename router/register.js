const express = require("express");
const bodyParser = require('body-parser');
//var session = require('express-session');
var cookieParser = require('cookie-parser');
const register = require("../data/register");
const exphbs = require("express-handlebars");

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

router.post("/login",async (req, res) =>{
    let loginInfo = req.body;
    const flag = await register.login(loginInfo.username, loginInfo.passwd);
    if(flag){
        let menuList = [
            {parent_id:1, child_id:[{name:"Drug Charge",href:"http://localhost:3000/drugCharge"},{name:"Charge Summary"}]},
            {parent_id:2, child_id:[{name:"Daily Business Statement"},{name:"Performance Summary Statement"}]},
            {parent_id:3, child_id:[{name:"Drug Info"}]},
            {parent_id:4, child_id:[{name:"User Management"},{name:"Doctor Info"},{name:"Data Maintenance"}]},
        ]
        res.render("sys/sysIndex", {flag : false, menuList: menuList, partialFlag: false}); 
    }else{
        res.render("sys/main", {flag :true, partial: "register-script", error:true});
    }
});

router.post("/register",async (req, res) =>{
    try{
        let loginInfo = req.body;
        const flag = await register.register(loginInfo.usernameR, loginInfo.passswd1);
        if(flag){
           res.render("sys/sysIndex", {flag : false}); 
        }
    }catch(e){
        res.render("sys/main", {flag :true, partial: "register-script", error:true});
    }     
 });

module.exports = router;