const mongoCollections = require("../config/mongoCollections");
const hjInfo = mongoCollections.hjInfo;
const hjFeeInfo = mongoCollections.hjFeeInfo;
const ObjectId = require("mongodb").ObjectID;

module.exports = {
    async getDrugInfo() {
        let data = [
            {
                "drugsId": 1,
                "drugsName": "布袋",
                "TIAOXING": "11223344",
                "drugsType": "1",
                "drugsSpec": "个",
                "drugsUnint": "个",
                "price": "12"
            },
            {
                "drugsId": 2,
                "drugsName": "布袋",
                "TIAOXING": "11223344",
                "drugsType": "1",
                "drugsSpec": "个",
                "drugsUnint": "个",
                "price": "12"
            },
            {
                "drugsId": 3,
                "drugsName": "布袋",
                "TIAOXING": "11223344",
                "drugsType": "1",
                "drugsSpec": "个",
                "drugsUnint": "个",
                "price": "12"
            },
            {
                "drugsId": 4,
                "drugsName": "布袋",
                "TIAOXING": "11223344",
                "drugsType": "1",
                "drugsSpec": "个",
                "drugsUnint": "个",
                "price": "12"
            }
        ]
        return data;
    },

    async findhjInfoById(id) {
        const con_hjInfo = await hjInfo();
        const data = await con_hjInfo.findOne({_id:ObjectId(id)});
        return data;
    },

    async addChargeInfo(chargeInfo, chargeFeeInfoList,flag) {
        try {
            const con_hjInfo = await hjInfo();
            const con_hjFeeInfo = await hjFeeInfo();
            chargeInfo["feeName"] = loginName;
            chargeInfo["serviceId"] = serviceId;
            chargeInfo["inFee"] = parseFloat(chargeInfo["inFee"]);
            chargeInfo["numFee"] = parseFloat(chargeInfo["numFee"]);
            chargeInfo["changeFee"] = parseFloat(chargeInfo["changeFee"]);
            chargeInfo["owemoney"] = parseFloat(chargeInfo["owemoney"]);
            let id = chargeInfo["_id"];
            delete chargeInfo["_id"];
            var in_hjInfo = null;
            if(flag=="2"){
                in_hjInfo = await con_hjInfo.updateOne({_id : ObjectId(id)},{$set:chargeInfo});
                await con_hjFeeInfo.removeMany({ "chargesId": ObjectId(id) });
            }
            if(flag =="1" || flag=="3"){
                in_hjInfo = await con_hjInfo.insertOne(chargeInfo);
                id = in_hjInfo.insertedId;
            }
                for (let i = 0; i < chargeFeeInfoList.length; i++) {
                    chargeFeeInfo = chargeFeeInfoList[i];
                    chargeFeeInfo["chargesId"] = ObjectId(id);
                    chargeFeeInfo["allNum"] = parseInt(chargeFeeInfo["allNum"]);
                    chargeFeeInfo["price1"] = parseFloat(chargeFeeInfo["price1"]);
                    chargeFeeInfo["numPrice"] = parseFloat(chargeFeeInfo["numPrice"]);
                    await con_hjFeeInfo.insertOne(chargeFeeInfo);
                }
            return true;
        } catch (e) {
            return false;
        }
    },

    async findhjInfo(hjInfoList, page) {
        let dex = (page - 1) * 30;
        let findInfo = {};
        let keys = Object.keys(hjInfoList);
        for (let i = 0; i < keys.length; i++) {
            if (hjInfoList[keys[i]] != "" && keys[i] !="startDate" && keys[i] !="endDate") {
                findInfo[keys[i]] = hjInfoList[keys[i]];
            }
        }
        findInfo["serviceId"] = serviceId;
        const con_hjInfo = await hjInfo();
        let data = await con_hjInfo.find(findInfo).sort({feeDate : -1}).toArray();
        let total = await con_hjInfo.aggregate([{$match:findInfo},{$group:{_id:null, total:{ $sum:"$numFee"},
        received:{ $sum:"$inFee"},owemoney:{ $sum:"$owemoney"}}}]).toArray();
        let dataCount = data.length;
        data = data.slice(dex,dex+30);
        return {dataList : data, pageSize : dataCount, Total :total};
    },

    async findhjFeeInfo(hjFeeInfoList) {
        const con_hjFeeInfo = await hjFeeInfo();
        const data = await con_hjFeeInfo.find(hjFeeInfoList).toArray();
        return data;
    },

    async deleteFeeInfo(id,parentId){
        const con_hjFeeInfo = await hjFeeInfo();
        let delInfo = {};
        if(id !=""){
            delInfo["_id"] = ObjectId(id);
        }
        if(parentId !=""){
            delInfo["chargesId"] = ObjectId(parentId);
        }
        const deleteInfo = await con_hjFeeInfo.removeMany(delInfo);
        return deleteInfo.deletedCount;
    },

    async deleteHjInfo(id){
        const con_hjInfo = await hjInfo();
        const data = await con_hjInfo.findOne({_id : ObjectId(id)});
        const deleteInfo = await con_hjInfo.removeOne({_id : ObjectId(id)});
        if(deleteInfo.deletedCount > 0){
            return data;
        }else{
            return null;
        }
    }
}