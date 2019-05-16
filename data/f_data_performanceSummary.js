const mongoCollections = require("../config/mongoCollections");
const hjInfo = mongoCollections.hjInfo;

module.exports = {

    async findSummary(findInfo){
        const _connect = await hjInfo();
        let find = {};
        let keys = Object.keys(findInfo);
        for (let i = 0; i < keys.length; i++) {
            if (findInfo[keys[i]] != "" && keys[i] !="startDate" && keys[i] !="endDate") {
                find[keys[i]] = findInfo[keys[i]];
            }
        }
        find["serviceId"] = serviceId;
            let data = await _connect.aggregate([
                {$match:find},
                {
                    $lookup:
                      {
                        from: "hjFeeInfo",
                        localField: "_id",
                        foreignField: "chargesId",
                        as: "feeInfo"
                      }
                },
                { "$unwind": "$feeInfo" },
                {
                    $lookup:
                      {
                        from: "drugInfo",
                        localField: "feeInfo.drugsId",
                        foreignField: "_id",
                        as: "drugInfo"
                      }
                },
                {
                    $group:
                    {
                        _id : {firstDoc:"$firstDoc", drugType : "$drugInfo.drugType"},
                        totalIn : {$sum : "$feeInfo.numPrice"}
                    }
                },
                {
                    $group:
                    {
                        _id : "$_id.firstDoc",
                        list:{
                            $push:"$$ROOT"
                        },
                        Tatol : {$sum : "$totalIn"}
                    }
                },
                { "$unwind": "$list" },
                { "$unwind": "$list._id.drugType" },
                {
                    $project : {
                        firstDoc : "$_id",
                        drugType : {"$cond" : [ { "$eq" : [ "$list._id.drugType" , "1"]} , "Prescription" , "non-Prescription"]},
                        totalIn : "$list.totalIn",
                        total : "$Tatol"
                    }
                }
            ]).sort({firstDoc:1}).toArray();

        return data;
    }
}