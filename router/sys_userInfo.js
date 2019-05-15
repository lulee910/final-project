const express = require("express");
const router = express.Router();
const user = require("../data/sys_data_userInfo");


router.get("/", async (req, res) =>{
    res.render("sys/userInfo", {head_script:"head_script", flag1 : true}); 
});

router.post("/query", async (req, res) =>{
    let data = req.body;
    let name = data.name;
    let userData = await user.findByName(name);
    res.render("sys/userInfo", {head_script:"head_script", userInfo : userData, flag1 : true}); 
});

router.post("/save", async (req,res) =>{
    let data = req.body;
    try{
        let userInfo = data.userInfo;
        let ret = null;
        if(userInfo._id !=""){
            ret = await user.update(userInfo);
        }else{  
            delete userInfo._id;
            ret = await user.add(userInfo);
        }
        res.render("sys/userInfo", {head_script:"head_script",userInfo: ret, message : "Save success", flag1 : true});
    }catch(e){
        res.render("sys/userInfo", {head_script:"head_script", updateInfo: data.userInfo, flag2 : true,
        message : e});
    }    
     

});

router.get("/update/:id", async (req, res) =>{
    let id = req.params.id;
    let ret = await user.findById(id);
    res.render("sys/userInfo", {head_script:"head_script", updateInfo: ret, flag2 : true, read : true}); 
});

router.post("/delete", async (req, res) =>{
    let data = req.body;
    let ret = await user.delete(data._id);
    res.json(ret);
});

module.exports = router;