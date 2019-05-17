const express = require("express");
const router = express.Router();
const drug = require("../data/d_data_drugInfo");
const fs = require("fs");
const Busboy = require('busboy');
const XLSX = require('xlsx');

router.get("/", async (req, res) => {
    res.render("drug/drugInfo", { head_script: "head_script", flag1: true });
});

router.get("/update/:id", async (req, res) => {
    let id = req.params.id;
    let drugs = await drug.findById(id);
    res.render("drug/drugInfo", { head_script: "head_script", drugData: drugs, flag2: true });
});

router.get("/query", async (req, res) => {
    let drugData = req.query.drugInfo;
    let drugs = await drug.findByNT(drugData);
    res.render("drug/drugInfo", { head_script: "head_script", drugInfo: drugs, flag1: true, queryList: drugData });
});

router.post("/save", async (req, res) => {
    let data = req.body;
    let drugInfo = data.drugInfo;
    let flag = false;
    let drugs = null;
    if (drugInfo._id != "") {
        drugs = await drug.update(drugInfo);
        flag = true;
    } else {
        delete drugInfo._id;
        if (drug.check(drugInfo.drugName) != null) {
            flag = false;
        } else {
            drugs = await drug.add(drugInfo);
            flag = true;
        }
    }
    if (flag === true) {
        res.render("drug/drugInfo", { head_script: "head_script", drugInfo: drugs, message: "Save success", flag1: true });
    } else {
        res.render("drug/drugInfo", { head_script: "head_script", drugData: drugs, flag2: true, message: "Save Failed, Drugs already exist!" });
    }

});

router.post("/delete", async (req, res) => {
    let data = req.body;
    let drugs = await drug.delete(data.id);
    res.json(drugs);
});

router.post("/getDrugInfo", async (req, res) => {
    let name = req.body.drugsName;
    let data = await drug.findByName(name);
    res.json(data);
});

router.post("/export", async (req, res) => {
    let drugData = {
        drugName: req.body.drugName,
        drugType: req.body.drugType
    }
    let result = await drug.export(drugData, req.body.rowCount);
    let path = process.cwd() + "\\export\\";
    let dateTime = new Date();
    let report = dateTime.getTime();
    var writeStream = fs.createWriteStream(path + report + ".xlsx");
    writeStream.on('finish', async function () {
        res.send({
            status: 0,
            message: 'ok',
        })
    });

    writeStream.on('error', async function (err) {
        res.send({
            status: 1,
            message: err.message,
        })
    });
    writeStream.write(result, 'binary');
    writeStream.end();
});
router.post("/import", async (req, res) => {
    let busboy = new Busboy({
        headers: req.headers,
        limits: {
            files: 1,
            fileSize: 50000000
        }
    });
    req.pipe(busboy);
    busboy.on('file', async (fieldname, file, filename, encoding, mimetype) => {
        file.on('data', async (data) => {
            var insertCount = 0;
            var workbook = XLSX.read(data);
            var sheetNames = workbook.SheetNames; // return ['sheet1', 'sheet2',……]
            var worksheet = workbook.Sheets[sheetNames[0]];//Get the first table in excel
            var ref = worksheet['!ref']; //Get the valid range of excel, such as A1:F20
            if(typeof ref =="undefined"){
                res.render("drug/drugInfo", { head_script: "head_script", flag1: true, message:"The imported file is incorrect, please use template file to import" });
                return;
            }
            var reg = /[a-zA-Z]/g;
            ref = ref.replace(reg, "");
            var line = parseInt(ref.split(':')[1]); // Gets the number of valid rows in excel
            let head = worksheet['A1'].v;
            if(head !== "Drug Name"){
                res.render("drug/drugInfo", { head_script: "head_script", flag1: true, message:"The imported file is incorrect, please use template file to import" });
                return;
            }
            let dataInfo = [];
            //Read each row in a loop and process it 
            for (var i = 2; i <= line; i++) {
                let map = {};
                var A = worksheet['A' + i].v || '';
                var B = worksheet['B' + i].v || '';
                var C = worksheet['C' + i].v || '';
                var D = worksheet['D' + i].v || '';
                var E = worksheet['E' + i].v || '';
                var F = worksheet['F' + i].v || '';
                var G = worksheet['G' + i].v || '';
                switch (C) {
                    case 'Prescription':
                        C = '1';
                        break;
                    case 'non-Prescription':
                        C = '2';
                        break;
                }
                switch (E) {
                    case 'box':
                        E = '1';
                        break;
                    case 'bag':
                        E = '2';
                        break;
                    default:
                        E = '3';
                }
                map["drugName"] = A;
                map["barCode"] = B;
                map["drugType"] = C;
                map["drugSpec"] = D;
                map["drugUnit"] = E;
                map["drugPrice"] = F;
                map["SCDate"] = G;
                dataInfo.push(map);
            }
            for (let i = 0; i < dataInfo.length; i++) {
                if (drug.check(dataInfo[i]["drugName"]) == null) {
                    let aa = await drug.add(dataInfo[i]);
                    insertCount++;
                }
            }
            let drugData = {
                drugName: "",
                drugType: ""
            }
            let exist = line - insertCount - 1;
            let message = "successfully inserted: " + insertCount + " Existing drugs: " + exist;
            let drugs = await drug.findByNT(drugData);
            res.render("drug/drugInfo", {
                head_script: "head_script", drugInfo: drugs, flag1: true, queryList: drugData,
                message: message
            });
        })
    })
});

router.get("/importTemplate", async (req, res) => {
    var path = process.cwd() + "\\template\\template.xlsx";
    var filename = path.substring(path.lastIndexOf('/') + 1);
    res.download(path, filename);
});

module.exports = router;