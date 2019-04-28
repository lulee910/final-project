const dbConnection = require("./mongoConnection");

const getCollectionFn = collection => {
  let _col = undefined;

  return async () => {
    if (!_col) {
      const db = await dbConnection();
      _col = await db.collection(collection);
    }

    return _col;
  };
};


module.exports = {
    sysUser: getCollectionFn("sysUser"),
    sysRole: getCollectionFn("sysRole"),
    sysRoleMenu: getCollectionFn("sysRoleMenu"),
    hjFeeInfo: getCollectionFn("hjFeeInfo"),
    hjInfo: getCollectionFn("hjInfo"),
    lossInfo: getCollectionFn("lossInfo"),
    drugInfo: getCollectionFn("drugInfo"),
    enterInfo: getCollectionFn("enterInfo"),
    doctorInfo: getCollectionFn("doctorInfo")
  };