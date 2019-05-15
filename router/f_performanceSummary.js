const express = require("express");
const router = express.Router();
const summary = require("../data/f_data_performanceSummary")
const doctorData = require("../data/c_data_doctorInfo");

var doctorInfoList = null;
router.get("/", async (req, res) =>{
    doctorInfoList = await doctorData.findAll();
    res.render("finance/performanceSummary", {head_script:"head_script",doctor: doctorInfoList}); 
});

router.post("/query", async (req, res) =>{
    let data = req.body;
    let findInfo = data.findInfo;
    if(findInfo.startDate !=""){
        findInfo.feeDate = { "$gte" : findInfo.startDate, "$lte" : findInfo.endDate }
    }else{
        findInfo.feeDate = "";
    } 
    let ret = await summary.findSummary(findInfo);
    res.render("finance/performanceSummary", {head_script:"head_script", doctor: doctorInfoList, summaryInfo: ret, queryList : data.findInfo}); 
})

module.exports = router;