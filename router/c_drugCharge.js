const express = require("express");
const bodyParser = require('body-parser');
const router = express.Router();
const drugCharge = require("../data/c_data_drugCharge");


const hjFeeInfoTpl = {drugsType:"{{row.drugsType}}",drugsName:"{{row.drugsName}}",
idx:"{{idx}}",drugsSpec:"{{row.drugsSpec}}",price:"{{row.price}}",numPrice:"{{row.numPrice}}",groupId:"{{row.groupId}}",chargesId:"{{row.chargesId}}",
feeId:"{{row.feeId}}",allNum:"{{row.allNum}}",drugsId:"{{row.drugsId}}"
};

router.get("/", async (req, res) =>{
    res.render("charge/drugCharge", {head_script:"head_script", row : hjFeeInfoTpl}); 
});


router.post("/getDrugInfo", async (req, res) =>{
    let data  = await drugCharge.getDrugInfo();
    res.json(data);

});

router.post("/", async (req, res) =>{
    let data  = req.body;
    let chargeInfo = data.hjInfoList;
    let chargeFeeInfo = data.hjFeeInfoList;
    const ret = await drugCharge.addChargeInfo(chargeInfo,chargeFeeInfo);
    if(ret){
        res.render("charge/drugCharge", {head_script:"head_script",row : hjFeeInfoTpl, message: "Save success"}); 
    }else{
        res.render("charge/drugCharge", {head_script:"head_script",row : hjFeeInfoTpl, message: "Save failed"}); 
    }
    

});

module.exports = router;