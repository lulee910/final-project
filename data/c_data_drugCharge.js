const mongoCollections = require("../config/mongoCollections");
const hjInfo = mongoCollections.hjInfo;
const hjFeeInfo = mongoCollections.hjFeeInfo;

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

    async addChargeInfo(chargeInfo, chargeFeeInfoList) {
        try {
            const con_hjInfo = await hjInfo();
            const con_hjFeeInfo = await hjFeeInfo();
            let in_hjFeeInfo, in_hjInfo = 0;
            in_hjInfo = await con_hjInfo.insertOne(chargeInfo);
            await con_hjFeeInfo.removeMany({ "chargesId": in_hjInfo.insertedId });
            if (in_hjInfo.insertedCount > 0) {
                for (let i = 0; i < chargeFeeInfoList.length; i++) {
                    chargeFeeInfo = chargeFeeInfoList[i];
                    chargeFeeInfo["chargesId"] = in_hjInfo.insertedId;
                    in_hjFeeInfo = await con_hjFeeInfo.insertOne(chargeFeeInfo);
                }
            }
            return true;
        } catch (e) {
            return false;
        }
    },

    async findhjInfo(hjInfoList) {
        let findInfo = {};
        for (let i = 0; i < hjInfoList.length; i++) {
            if (hjInfoList[i] != "") {
                findInfo.push(hjInfoList[i]);
            }
        }
        const con_hjInfo = await hjInfo();
        const data = await con_hjInfo.find().toArray();
        return data;
    },

    async findhjFeeInfo(hjFeeInfoList) {
        const con_hjFeeInfo = await hjFeeInfo();
        const data = await con_hjFeeInfo.find(hjFeeInfoList).toArray();
        return data;
    }
}