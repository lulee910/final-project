const mongoCollections = require("../config/mongoCollections");
const doctorInfo = mongoCollections.doctorInfo;
const ObjectId = require("mongodb").ObjectID;


module.exports = {
    async findAll(){
        const con_doctorInfo = await doctorInfo();
        const data = await con_doctorInfo.find({serviceId : serviceId}).toArray();
        return data;
    },

    async findByName(name){
        const con_doctorInfo = await doctorInfo();
        const data = await con_doctorInfo.find({serviceId : serviceId, $or:[{firstName : new RegExp(name)}, {lastName : new RegExp(name)}]}).toArray();
        return data;
    },

    async findById(id){
        const con_doctorInfo = await doctorInfo();
        const data = await con_doctorInfo.find({_id: ObjectId(id)}).toArray();
        return data;
    },

    async add(doctorData){
        const con_doctorInfo = await doctorInfo();
        doctorData["serviceId"] = serviceId;
        let in_doctorInfo = await con_doctorInfo.insertOne(doctorData);
        let ret = await this.findById(in_doctorInfo.insertedId);
        return ret;
    },

    async update(doctorData){
        const con_doctorInfo = await doctorInfo();
        let updateInfo ={$set:{
            firstName : doctorData.firstName,
            lastName : doctorData.lastName,
            tel : doctorData.tel
        }};
        await con_doctorInfo.updateOne({_id: ObjectId(doctorData._id), serviceId: serviceId}, updateInfo);
        let ret = await this.findById(doctorData._id);
        return ret;
    },

    async delete(id){
        const con_doctorInfo = await doctorInfo();
        let ret = await con_doctorInfo.removeOne({_id : ObjectId(id), serviceId:serviceId});
        return ret.deletedCount;
    }

}