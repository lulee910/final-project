const express = require("express");
const bodyParser = require('body-parser');
const router = express.Router();
const drugCharge = require("../data/c_data_drugCharge");


router.get("/", async (req, res) =>{
    let data = req.body;
    res.render("charge/chargeSummary", {head_script:"head_script"}); 
});

router.post("/query", async (req, res) =>{
    let data = req.body;
    let hjInfoList = data.hjInfoList;
    if(hjInfoList.feeDate[0] !=""){
        hjInfoList.feeDate = { "$gte" : hjInfoList.feeDate[0], "$lte" : hjInfoList.feeDate[1] }
    }else{
        hjInfoList.feeDate = "";
    }  
    let hjInfoData = await drugCharge.findhjInfo(hjInfoList);
    for(let i=0;i<hjInfoData.length; i++){
        let hjFeeInfoData = await drugCharge.findhjFeeInfo({chargesId : hjInfoData[i]._id});
        hjInfoData[i]["hjFeeInfoList"] = hjFeeInfoData;
    }
    res.render("charge/chargeSummary", {head_script:"head_script", hjInfo : hjInfoData}); 
});

module.exports = router;