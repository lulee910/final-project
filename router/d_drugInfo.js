const express = require("express");
const bodyParser = require('body-parser');
const router = express.Router();
const drug = require("../data/d_data_drugInfo");

router.get("/", async (req, res) =>{
    res.render("drug/drugInfo", {head_script:"head_script"}); 
});

router.get("/update/:id", async (req, res) =>{
    let id = req.params.id;
    let drug = await drug.findById(id);
    res.render("drug/drugInfo", {head_script:"head_script", drugData: drug}); 
});

router.post("/query", async (req, res) =>{
    let data = req.body;
    let drugData = await drug.findByNT(data);
    res.render("drug/drugInfo", {head_script:"head_script", drugInfo : drugData}); 
});

router.post("/save", async (req,res) =>{
    let data = req.body;
    let drugInfo = data.drugInfo;
    let drug = await drug.add(drugInfo);
    res.render("drug/drugInfo", {head_script:"head_script", drugInfo: drug, message : "Save success"}); 
});

router.post("/delete", async (req, res) =>{
    let data = req.body;
    let drug = await drug.delete(data._id);
    res.json(drug);
});

module.exports = router;