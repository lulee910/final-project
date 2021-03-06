const mongoCollections = require("../config/mongoCollections");
const hjInfo = mongoCollections.hjInfo;

module.exports = {

    async findDailyBusiness(findInfo){
        const _connect = await hjInfo();
        let find = {};
        let keys = Object.keys(findInfo);
        for (let i = 0; i < keys.length; i++) {
            if (findInfo[keys[i]] != "" && keys[i] !="startDate" && keys[i] !="endDate") {
                find[keys[i]] = findInfo[keys[i]];
            }
        }
        find["serviceId"] = serviceId;
        let data = await _connect.aggregate([{$match:find},
            {$group:{_id:{$substr: [ "$feeDate", 0, 10 ]},
            totalCash : { "$sum" : { "$cond" : [ { "$eq" : [ "$methodType" , "1"]} , "$inFee" , 0]}},
            totalCard : { "$sum" : { "$cond" : [ { "$ne" : [ "$methodType" , "1"]} , "$inFee" , 0]}},
            totalNumFee:{ $sum:"$numFee"},
            totalInFee:{ $sum:{ $subtract : ["$inFee","$changeFee"]}},
            totalOwemoney:{ $sum:"$owemoney"}}}
            ]).sort({_id:1}).toArray();
        let total = await _connect.aggregate([{$match:find},{$group:{_id:null, total:{ $sum:"$numFee"},
        received:{ $sum:"$inFee"},owemoney:{ $sum:"$owemoney"}}}]).toArray();
        return {dataList : data, Total :total};
    }
}