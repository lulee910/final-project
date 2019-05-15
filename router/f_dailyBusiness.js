const express = require("express");
const bodyParser = require('body-parser');
const router = express.Router();
const daily = require("../data/f_data_dailyBusiness");


router.get("/", async (req, res) =>{
    res.render("finance/dailyBusiness", {head_script:"head_script"}); 
});

router.post("/query", async (req, res) =>{
    let data = req.body;
    let findInfo = data.findInfo;
    if(findInfo.startDate !=""){
        findInfo.feeDate = { "$gte" : findInfo.startDate, "$lte" : findInfo.endDate + " 24:00"  }
    }else{
        findInfo.feeDate = "";
    } 
    let ret = await daily.findDailyBusiness(findInfo);
    res.render("finance/dailyBusiness", {head_script:"head_script", dailyInfo: ret.dataList,Total:ret.Total, queryList : data.findInfo}); 
})

module.exports = router;