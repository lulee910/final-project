const express = require("express");
const bodyParser = require('body-parser');
const router = express.Router();
const drugCharge = require("../data/c_data_chargeSummary");


router.get("/", async (req, res) =>{
    let data = req.body;
    res.render("sys/doctorInfo", {head_script:"head_script"}); 
});

module.exports = router;