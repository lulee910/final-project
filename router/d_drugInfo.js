const express = require("express");
const bodyParser = require('body-parser');
const router = express.Router();
const drug = require("../data/d_data_drugInfo");

router.get("/", async (req, res) =>{
    res.render("drug/drugInfo", {head_script:"head_script", flag1 : true}); 
});

router.get("/update/:id", async (req, res) =>{
    let id = req.params.id;
    let drugs = await drug.findById(id);
    res.render("drug/drugInfo", {head_script:"head_script", drugData: drugs, flag2 : true}); 
});

router.post("/query", async (req, res) =>{
    let drugData = req.body;
    let drugs = await drug.findByNT(drugData);
    res.render("drug/drugInfo", {head_script:"head_script", drugInfo : drugs, flag1 : true}); 
});

router.post("/save", async (req,res) =>{
    let data = req.body;
    let drugInfo = data.drugInfo;
    let drugs = null;
    if(drugInfo._id !=""){
        drugs = await drug.update(drugInfo);
    }else{  
        delete drugInfo._id;
        drugs = await drug.add(drugInfo);
    }
    res.render("drug/drugInfo", {head_script:"head_script", drugData: drugs, message : "Save success", flag1 : true}); 
});

router.post("/delete", async (req, res) =>{
    let data = req.body;
    let drugs = await drug.delete(data._id);
    res.json(drugs);
});

module.exports = router;