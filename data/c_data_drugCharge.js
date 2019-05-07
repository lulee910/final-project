const mongoCollections = require("../config/mongoCollections");
const hjInfo = mongoCollections.hjInfo;
const hjFeeInfo = mongoCollections.hjFeeInfo;
const ObjectId = require("mongodb").ObjectID;

module.exports = {
    async getDrugInfo() {
        let data = [
            {
                "drugId": 1,
                "drugName": "布袋",
                "barCode": "11223344",
                "drugType": "1",
                "drugSpec": "个",
                "drugUnint": "个",
                "drugPrice": "12"
            },
            {
                "drugId": 2,
                "drugName": "布袋",
                "barCode": "11223344",
                "drugType": "1",
                "drugSpec": "个",
                "drugUnint": "个",
                "drugPrice": "12"
            },
            {
                "drugId": 3,
                "drugName": "布袋",
                "barCode": "11223344",
                "drugType": "1",
                "drugSpec": "个",
                "drugUnint": "个",
                "drugPrice": "12"
            },
            {
                "drugId": 4,
                "drugName": "布袋",
                "barCode": "11223344",
                "drugType": "1",
                "drugSpec": "个",
                "drugUnint": "个",
                "drugPrice": "12"
            }
        ]
        return data;
    },

    async addChargeInfo(chargeInfo, chargeFeeInfoList) {
        try {
            const con_hjInfo = await hjInfo();
            const con_hjFeeInfo = await hjFeeInfo();
            chargeInfo["feeName"] = loginName;
            chargeInfo["serviceId"] = serviceId;
            chargeInfo["inFee"] = parseFloat(chargeInfo["inFee"]);
            chargeInfo["numFee"] = parseFloat(chargeInfo["numFee"]);
            chargeInfo["changeFee"] = parseFloat(chargeInfo["changeFee"]);
            chargeInfo["owemoney"] = parseFloat(chargeInfo["owemoney"]);
            let in_hjInfo = await con_hjInfo.insertOne(chargeInfo);
            await con_hjFeeInfo.removeMany({ "chargesId": in_hjInfo.insertedId });
            if (in_hjInfo.insertedCount > 0) {
                for (let i = 0; i < chargeFeeInfoList.length; i++) {
                    chargeFeeInfo = chargeFeeInfoList[i];
                    chargeFeeInfo["chargesId"] = in_hjInfo.insertedId;
                    chargeFeeInfo["allNum"] = parseInt(chargeFeeInfo["allNum"]);
                    chargeFeeInfo["price1"] = parseFloat(chargeFeeInfo["price1"]);
                    chargeFeeInfo["numPrice"] = parseFloat(chargeFeeInfo["numPrice"]);
                    await con_hjFeeInfo.insertOne(chargeFeeInfo);
                }
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