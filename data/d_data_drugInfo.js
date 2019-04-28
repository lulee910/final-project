const mongoCollections = require("../config/mongoCollections");
const drugInfo = mongoCollections.drugInfo;
const ObjectId = require("mongodb").ObjectID;


module.exports = {

    async add(drugData){
        const drugInfos = await drugInfo();
        drugData["drugId"] = drugId;
        let in_drugInfos = await drugInfos.insertOne(drugData);
        let drug = await this.findById(in_drugInfos.insertedId);
        return drug;
    },

    async findAll(){
        const drugInfos = await drugInfo();
        let data = await drugInfos.find({drugId : drugId}).toArray();
        return data;
    },

    async findByNT(data){
        const drugInfos = await drugInfo();
        let data = await drugInfos.find({drugId : drugId, $or: [{drugName : new RegExp(data.drugName)}, {drugType : new RegExp(data.drugType)}] }).toArray();
        return data;
    },

    async findById(id){
        const drugInfos = await drugInfo();
        const data = await drugInfos.find({_id: ObjectId(id)}).toArray();
        return data;
    },

    async update(drugData){
        const drugInfos = await drugInfo();
        await drugInfos.updateOne({_id : drugData._id, drugId : drugId}, drugData);
    },

    async delete(id){
        const drugInfos = await drugInfo();
        await drugInfos.removeOne({_id : ObjectId(id), drugId: drugId});
    }

}