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
    res.render("sys/main", {flag :true});
});

router.post("/login",async (req, res) =>{
    let loginInfo = req.body;
    const flag = await register.login(loginInfo.username, loginInfo.passwd);
    if(flag !=null){
        let menuList = [
            {parent_id:1, child_id:[{name:"Drug Charge",href:"/drugCharge"},{name:"Charge Summary",href:"/chargeSummary"}]},
            {parent_id:2, child_id:[{name:"Daily Business Statement"},{name:"Performance Summary Statement"}]},
            {parent_id:3, child_id:[{name:"Drug Info"}]},
            {parent_id:4, child_id:[{name:"User Management"},{name:"Doctor Info",href:"/doctorInfo"},{name:"Data Maintenance"}]},
        ]
        loginId = flag._id;
        loginName = flag.userName;
        serviceId = flag.serviceId;
        res.render("sys/sysIndex", {flag : false,  menuList: menuList, head_script:"head_script"}); 
    }else{
        res.render("sys/main", {flag :true,  error:true, head_script:"head_script"});
    }
});

router.post("/register",async (req, res) =>{
    var loginInfo = req.body;
    try{
        const flag = await register.register(loginInfo.usernameR, loginInfo.passswd1);
        res.render("sys/main", {flag :true, message:"Registered successfully", head_script:"head_script"});
    }catch(e){
        res.render("sys/main", {flag :true, message: e, head_script:"head_script", liFlag:2,
        usernameR :loginInfo.usernameR, passswd1: loginInfo.passswd1, passswd2: loginInfo.passswd2});
    }     
 });

module.exports = router;