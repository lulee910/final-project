const mongoCollections = require("../config/mongoCollections");
const userInfo = mongoCollections.sysUser;
const ObjectId = require("mongodb").ObjectID;
const crypto = require("crypto");


module.exports = {
    async findAll(){
        const con_userInfo = await userInfo();
        const data = await con_userInfo.find({serviceId : serviceId}).toArray();
        return data;
    },

    async findByName(name){
        const con_userInfo = await userInfo();
        const data = await con_userInfo.find({serviceId : serviceId, userName : new RegExp(name)}).toArray();
        return data;
    },

    async findById(id){
        const con_userInfo = await userInfo();
        const data = await con_userInfo.find({_id: ObjectId(id)}).toArray();
        return data;
    },

    async add(userData){
        const con_userInfo = await userInfo();
        let md5 = crypto.createHash("md5");
        let newPas = md5.update(userData["passwd"]).digest("hex");
        userData["passwd"] = newPas;
        userData["serviceId"] = serviceId;
        let in_userInfo = await con_userInfo.insertOne(userData);
        let ret = await this.findById(in_userInfo.insertedId);
        return ret;
    },

    async update(userData){
        const con_userInfo = await userInfo();
        let md5 = crypto.createHash("md5");
        let newPas = md5.update(userData["passwd"]).digest("hex");
        let updateInfo ={$set:{
            userName : userData["userName"],
            passWord : newPas,
        }};
        await con_userInfo.updateOne({_id: ObjectId(userData._id), serviceId: serviceId}, updateInfo);
        let ret = await this.findById(userData._id);
        return ret;
    },

    async delete(id){
        const con_userInfo = await userInfo();
        let ret = await con_userInfo.removeOne({_id : ObjectId(id), serviceId:serviceId});
        return ret.deletedCount;
    }

}