const express = require("express");
const bodyParser = require('body-parser');
const router = express.Router();
const drugCharge = require("../data/c_data_drugCharge");
const doctorData = require("../data/c_data_doctorInfo");

const hjFeeInfoTpl = {drugType:"{{row.drugType}}",drugName:"{{row.drugName}}",
idx:"{{idx}}",drugSpec:"{{row.drugSpec}}",drugPrice:"{{row.drugPrice}}",numPrice:"{{row.numPrice}}",chargesId:"{{row.chargesId}}",
feeId:"{{row.feeId}}",allNum:"{{row.allNum}}",drugsId:"{{row.drugsId}}"
};
var doctorInfoList = null;
router.get("/", async (req, res) =>{
    var total = {
        total : 0, 
        received : 0,
        owemoney : 0
    };
    doctorInfoList = await doctorData.findAll();
    res.render("charge/chargeSummary", {head_script:"head_script", doctor: doctorInfoList, Total:total}); 
});

router.post("/query", async (req, res) =>{
    let data = req.body;
    let hjInfoList = data.hjInfoList;
    let page = data.pageNo;
    if(page ==""){
        page =1;
    }
    if(hjInfoList.startDate !=""){
        hjInfoList.feeDate = { "$gte" : hjInfoList.startDate, "$lte" : hjInfoList.endDate + " 24:00" }
    }else{
        hjInfoList.feeDate = "";
    }  
    let hjInfoDataRet = await drugCharge.findhjInfo(hjInfoList,page);
    let hjInfoData = hjInfoDataRet.dataList;
    for(let i=0;i<hjInfoData.length; i++){
        let hjFeeInfoData = await drugCharge.findhjFeeInfo({chargesId : hjInfoData[i]._id});
        hjInfoData[i]["hjFeeInfoList"] = hjFeeInfoData;
    }
    var total = {
        total : 0,
        received : 0,
        owemoney : 0
    };
    if(hjInfoDataRet.Total.length > 0){
        total = hjInfoDataRet.Total[0];
    }
    res.render("charge/chargeSummary", {head_script:"head_script", hjInfo : hjInfoData, queryList : data.hjInfoList, 
                doctor: doctorInfoList,pageCount :hjInfoDataRet.pageSize, pageNo:page, Total:total}); 
});

router.get("/update/*", async (req, res) =>{
    let id = req.params[0];
    let flag = req.query.Flag;
    let hjInfo = await drugCharge.findhjInfoById(id);
    if(flag == "3"){
        let dateTime = new Date();
        let date = dateTime.getMonth() + "/" + dateTime.getDay() + "/" + dateTime.getFullYear() +" " 
        + dateTime.getHours() + ":" + dateTime.getMinutes();
        hjInfo["feeDate"] = date;
    }
    res.render("charge/drugCharge", {head_script:"head_script", row : hjFeeInfoTpl, hjInfoList: hjInfo, hjFeeData: id, doctor: doctorInfoList,Flag : flag});  
});

router.post("/delete", async (req, res) =>{
    let data = req.body;
    let feeRet = await drugCharge.deleteFeeInfo("", data._id);
    if(feeRet > 0){
        let hjRet = await drugCharge.deleteHjInfo(data._id);
        return res.json(hjRet);
    }
});

module.exports = router;