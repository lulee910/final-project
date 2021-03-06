const express = require("express");
const sysUser = require("../data/sys_data_changePasswd");
const login = require("../data/register");
const router = express.Router();


router.get("/", async (req, res) =>{
    res.render("sys/changePasswd", {head_script:"head_script"}); 
});

router.post("/change", async (req, res) =>{
    let data = req.body;
    let ret = await login.login(loginName,data.passwd);
    let mes = "";
    if(ret == null){
        mes = "The original password you entered is incorrect";
    }else{
        await sysUser.changePasswd(data.passwd1);
        mes = "Password changed successfully";
    }
    res.render("sys/changePasswd", {head_script:"head_script", message:mes}); 
});

module.exports = router;