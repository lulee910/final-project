const mongoCollections = require("../config/mongoCollections");
const drugInfo = mongoCollections.drugInfo;
const ObjectId = require("mongodb").ObjectID;

module.exports = {

    async add(drugData){
        const drugInfos = await drugInfo();
        drugData["serviceId"] = serviceId;
        let in_drugInfos = await drugInfos.insertOne(drugData);
        let drug = await this.findById(in_drugInfos.insertedId);
        return drug;
    },

    async findAll(){
        const drugInfos = await drugInfo();
        let data = await drugInfos.find({serviceId : serviceId}).toArray();
        return data;
    },

    async findByNT(data){
        const drugInfos = await drugInfo();
        let drugs = await drugInfos.find({serviceId : serviceId, $or: [{drugName : data.drugName}, {drugType : data.drugType}] }).toArray();
        return drugs;
    },

    async findById(id){
        const drugInfos = await drugInfo();
        const data = await drugInfos.find({_id: ObjectId(id)}).toArray();
        return data;
    },

    async update(drugData){
        const drugInfos = await drugInfo();
        let updateInfo ={$set:{
            drugName: drugData.drugName,
            drugType: drugData.drugType,
            barCode: drugData.barCode,
            drugSpec: drugData.drugSpec,
            drugUnit: drugData.drugUnit,
            drugPrice: drugData.drugPrice,
            SCDate: drugData.SCDate,
            Remark: drugData.Remark
        }};
        await drugInfos.updateOne({_id: ObjectId(drugData._id), serviceId: serviceId}, updateInfo);
        let drug = await this.findById(drugData._id);
        return drug;
    },

    async delete(id){
        const drugInfos = await drugInfo();
        await drugInfos.removeOne({_id : ObjectId(id), serviceId: serviceId});
    }

}