const dbConnection = require("../config/mongoConnection");
const doctors = require("../data/c_data_doctorInfo");
const charges = require("../data/c_data_drugCharge");
const drugs = require("../data/d_data_drugInfo");
const registers = require("../data/register");
const users = require("../data/sys_data_userInfo");


dbConnection().then(
    db => {
        return db
            .dropDatabase()
            .then(() => {
                return dbConnection;
            })
            .then(db => {
                return registers.register("Phil", "123456");
            })
            .then(db => {
                return drugs
                    .add({ drugName: "aaa", drugType: "Prescription", drugPrice: "11.11" })
                    .then(() => {
                        return drugs.add({ drugName: "bbb", drugType: "Non-Prescription", drugPrice: "22.22" });
                    })
                    .then(() => {
                        return drugs.add({ drugName: "ccc", drugType: "Prescription", drugPrice: "33.33" });
                    })
                    .then(() => {
                        return drugs.add({ drugName: "ddd", drugType: "Non-Prescription", drugPrice: "44.44" });
                    });
            })
            .then(db => {
                return doctors
                    .add({ firstName: "Eric", lastName: "Wang", tel: 111-111-1111 })
                    .then(() => {
                        return doctors.add({ firstName: "Steven", lastName: "Liu", tel: 222-222-2222 });
                    })
                    .then(() => {
                        return doctors.add({ firstName: "Jack", lastName: "Chen", tel: 333-333-3333 });
                    });
            })
            .then(() => {
                console.log("Done seeding database");
                db.close();
            })
            .catch(err => {
                console.error(err);
            });
    },
    error => {
        console.error(error);
    }
);
