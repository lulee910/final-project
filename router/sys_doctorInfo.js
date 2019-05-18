const express = require("express");
const router = express.Router();
const doctor = require("../data/c_data_doctorInfo");


router.get("/", async (req, res) =>{
    let data = req.body;
    res.render("sys/doctorInfo", {head_script:"head_script", flag1 : true}); 
});

router.post("/query", async (req, res) =>{
    let data = req.body;
    let name = data.name;
    let doctorData = await doctor.findByName(name);
    res.render("sys/doctorInfo", {head_script:"head_script", doctorInfo : doctorData, searchName : name, flag1 : true}); 
});

router.post("/save", async (req,res) =>{
    let data = req.body;
    let doctorInfo = data.doctorInfo;
    let ret = null;
    if(doctorInfo._id !=""){
        ret = await doctor.update(doctorInfo);
    }else{  
        delete doctorInfo._id;
        ret = await doctor.add(doctorInfo);
    }
    res.render("sys/doctorInfo", {head_script:"head_script",doctorInfo: ret, message : "Save success", flag1 : true}); 

});

router.get("/update/:id", async (req, res) =>{
    let id = req.params.id;
    let ret = await doctor.findById(id);
    res.render("sys/doctorInfo", {head_script:"head_script", doctorData: ret, flag2 : true}); 
});

router.post("/delete", async (req, res) =>{
    let data = req.body;
    let ret = await doctor.delete(data._id);
    res.json(ret);
});

module.exports = router;