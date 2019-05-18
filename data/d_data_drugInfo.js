const mongoCollections = require("../config/mongoCollections");
const drugInfo = mongoCollections.drugInfo;
const ObjectId = require("mongodb").ObjectID;
const nodeExcel = require('excel-export');

module.exports = {

    async add(drugData) {
        const drugInfos = await drugInfo();
        if(drugData["serviceId"] == undefined){
            drugData["serviceId"] = serviceId;
        }
        drugData["drugPrice"] = parseFloat(drugData["drugPrice"]);
        let in_drugInfos = await drugInfos.insertOne(drugData);
        let drug = await this.findById(in_drugInfos.insertedId);
        return drug;
    },

    async findAll() {
        const drugInfos = await drugInfo();
        let data = await drugInfos.aggregate([
            { $match: { serviceId: serviceId } },
            {
                $project: {
                    drugName: 1,
                    drugType: { "$cond": [{ "$eq": ["$drugType", "1"] }, "Prescription", "non-Prescription"] },
                    barCode: 1,
                    drugSpec: 1,
                    drugUnit: 1,
                    drugPrice: 1,
                    SCDate: 1
                }
            }

        ]).toArray();
        return data;
    },

    async findByNT(data) {
        const drugInfos = await drugInfo();
        let drugs = await drugInfos.aggregate([
            { $match: { serviceId: serviceId, drugName: new RegExp(data["drugName"]), drugType: new RegExp(data["drugType"]) } },
            {
                $project: {
                    drugName: 1,
                    drugType: { "$cond": [{ "$eq": ["$drugType", "1"] }, "Prescription", "non-Prescription"] },
                    barCode: 1,
                    drugSpec: 1,
                    drugUnit: {
                        "$cond": {
                            if: { "$eq": ["$drugUnit", "1"] },
                            then: "box",
                            else: {
                                "$cond": {
                                    if: { "$eq": ["$drugUnit", "2"] },
                                    then: "bottle",
                                    else: {
                                        "$cond": {
                                            if: { "$eq": ["$drugUnit", "3"] },
                                            then: "bag",
                                            else: ""
                                        }
                                    }
                                }
                            }
                        }
                    },
                    drugPrice: 1,
                    SCDate: 1
                }
            }

        ]).sort({ drugType: 1 }).toArray();
        return drugs;
    },

    async findById(id) {
        const drugInfos = await drugInfo();
        const data = await drugInfos.find({ _id: ObjectId(id) }).toArray();
        return data;
    },

    async check(name) {
        const drugInfos = await drugInfo();
        const data = await drugInfos.find({ serviceId: serviceId, drugName: name }).toArray();
        return data.length;
    },

    async findByName(name) {
        const drugInfos = await drugInfo();
        let data = await drugInfos.aggregate([
            { $match: { serviceId: serviceId, $or: [{ drugName: new RegExp(name) }, { barCode: new RegExp(name) }] } },
            {
                $project: {
                    drugName: 1,
                    drugType: { "$cond": [{ "$eq": ["$drugType", "1"] }, "Prescription", "non-Prescription"] },
                    barCode: 1,
                    drugSpec: 1,
                    drugUnit: {
                        "$cond": {
                            if: { "$eq": ["$drugUnit", "1"] },
                            then: "box",
                            else: {
                                "$cond": {
                                    if: { "$eq": ["$drugUnit", "2"] },
                                    then: "bottle",
                                    else: {
                                        "$cond": {
                                            if: { "$eq": ["$drugUnit", "3"] },
                                            then: "bag",
                                            else: ""
                                        }
                                    }
                                }
                            }
                        }
                    },
                    drugPrice: 1,
                    SCDate: 1
                }
            }

        ]).toArray();
        return data;
    },

    async update(drugData) {
        const drugInfos = await drugInfo();
        let updateInfo = {
            $set: {
                drugName: drugData.drugName,
                drugType: drugData.drugType,
                barCode: drugData.barCode,
                drugSpec: drugData.drugSpec,
                drugUnit: drugData.drugUnit,
                drugPrice: drugData.drugPrice,
                SCDate: drugData.SCDate,
                Remark: drugData.Remark
            }
        };
        await drugInfos.updateOne({ _id: ObjectId(drugData._id), serviceId: serviceId }, updateInfo);
        let drug = await this.findById(drugData._id);
        return drug;
    },

    async delete(id) {
        const drugInfos = await drugInfo();
        let ret = await drugInfos.removeOne({ _id: ObjectId(id), serviceId: serviceId });
        return ret.deletedCount;
    },

    async  exportdata(v) {
        let conf = {};
        conf.name = "drugInfo";
        let alldata = new Array();
        for (let i = 0; i < v.length; i++) {
            let arr = new Array();
            arr.push(v[i].drugName);
            arr.push(v[i].barCode);
            arr.push(v[i].drugType);
            arr.push(v[i].drugSpec);
            arr.push(v[i].drugUnit);
            arr.push(v[i].drugPrice);
            arr.push(v[i].SCDate);
            alldata.push(arr);
        }
        conf.cols = [{
            caption: 'Drug Name',
            type: 'string'
        }, {
            caption: 'Bar Code',
            type: 'string'
        }, {
            caption: 'Drug Type',
            type: 'string'
        }, {
            caption: 'Drug Spec',
            type: 'string',
        }, {
            caption: 'Drug Unit',
            type: 'string',
        }, {
            caption: 'Drug Price',
            type: 'number',
        }, {
            caption: 'Production Date',
            type: 'string',
        }];
        conf.rows = alldata;
        let result = nodeExcel.execute(conf);
        return result;
    },

    async export(findInfo, rowCount) {
        let data = null;
        if (rowCount > 0) {
            data = await this.findByNT(findInfo);
        }
        let result = await this.exportdata(data);
        return result;
    }

}