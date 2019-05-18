const express = require("express");
const register = require("../data/register");
const router = express.Router();

var retMessage = "";
router.get("/", async (req, res) =>{
    if (req.session && req.session.name == 'AuthCookie') {
        res.redirect("/login");
    }else{
        if(retMessage == "error"){
            res.render("sys/main", {flag :true,  error:true, head_script:"head_script"});
        }else{
            res.render("sys/main", {flag :true, message : retMessage, head_script:"head_script"});
        }
    }
});

router.get("/login",async (req, res) =>{
    let loginInfo = req.query;
    if (req.session && req.session.name == 'AuthCookie') {
        loginInfo.username = req.session.user;
        loginInfo.passwd = req.session.passwd;
    }
    const flag = await register.login(loginInfo.username, loginInfo.passwd);
    if(flag !=null){
        req.session.name = 'AuthCookie';
        req.session.user = loginInfo.username;
        req.session.passwd = loginInfo.passwd;
        loginId = flag._id;
        loginName = flag.userName;
        serviceId = flag.serviceId;
        remarks = flag.remarks;
        res.redirect("/charge");
    }else{
        retMessage = "error";
        res.redirect("/");
    }
});

router.get("/charge", async (req, res) =>{
    if(loginName !=""){
        let list = null;
        if(remarks === "administrator"){
            list = [{name:"User Management",href:"/userInfo"},{name:"Doctor Info",href:"/doctorInfo"}];
        }else{
            list = [{name:"Doctor Info",href:"/doctorInfo"}];
        }
        let menuList = [
            {parent_id:1, child_id:[{name:"Drug Charge",href:"/drugCharge"},{name:"Charge Summary",href:"/chargeSummary"}]},
            {parent_id:2, child_id:[{name:"Daily Business Statement", href:"/dailyBusiness"},{name:"Performance Summary Statement", href:"/performanceSummary"}]},
            {parent_id:3, child_id:[{name:"Drug Info", href:"/drugInfo"}]},
            {parent_id:4, child_id:list},
        ];
        res.render("sys/sysIndex", {flag : false, title:"Charge", menuList: menuList, head_script:"head_script"}); 
    }else{
        res.redirect("/");
    }   
});

router.post("/register",async (req, res) =>{
    var loginInfo = req.body;
    try{
        const flag = await register.register(loginInfo.usernameR, loginInfo.passwd1);
        retMessage = "Registered successfully";
        res.redirect("/");
    }catch(e){
        res.render("sys/main", {flag :true, message: e, head_script:"head_script", liFlag:2,
        usernameR :loginInfo.usernameR, passwd1: loginInfo.passwd1, passwd2: loginInfo.passwd2});
    }     
 });

 router.get('/logout', async function(req, res) {
    req.session.destroy();
    retMessage = "";
    loginId = "";
    loginName = "";
    serviceId = "";
    remarks = "";
   res.redirect("/");
});

module.exports = router;