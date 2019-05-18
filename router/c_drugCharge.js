const express = require("express");
const router = express.Router();
const drugCharge = require("../data/c_data_drugCharge");
const doctorData = require("../data/c_data_doctorInfo");
const ObjectId = require("mongodb").ObjectID;


const hjFeeInfoTpl = {drugType:"{{row.drugType}}",drugName:"{{row.drugName}}",
idx:"{{idx}}",drugSpec:"{{row.drugSpec}}",drugPrice:"{{row.drugPrice}}",numPrice:"{{row.numPrice}}",chargesId:"{{row.chargesId}}",
feeId:"{{row.feeId}}",allNum:"{{row.allNum}}",drugsId:"{{row.drugsId}}"
};
var doctorInfoList = null;

router.get("/", async (req, res) =>{
    doctorInfoList = await doctorData.findAll();
    res.render("charge/drugCharge", {head_script:"head_script", row : hjFeeInfoTpl, doctor: doctorInfoList}); 
});


router.post("/getHjFeeInfo", async (req, res) =>{
    let data  = req.body;
    let id = data.id;
    let ret  = await drugCharge.findhjFeeInfo({chargesId:ObjectId(id)});
    res.json(ret);

});

router.post("/save", async (req, res) =>{
    let data  = req.body;
    let chargeInfo = data.hjInfoList;
    let chargeFeeInfo = data.hjFeeInfoList;
    let flag = data.Flag;
    if(flag=="") flag = "1";
    const ret = await drugCharge.addChargeInfo(chargeInfo,chargeFeeInfo,flag);
    if(ret){
        res.render("charge/drugCharge", {head_script:"head_script",row : hjFeeInfoTpl, message: "Save success", doctor: doctorInfoList}); 
    }else{
        res.render("charge/drugCharge", {head_script:"head_script",row : hjFeeInfoTpl, message: "Save failed", doctor: doctorInfoList}); 
    }
    

});

module.exports = router;