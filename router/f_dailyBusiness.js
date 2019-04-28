const express = require("express");
const bodyParser = require('body-parser');
const router = express.Router();


router.get("/", async (req, res) =>{
    res.render("finance/dailyBusiness", {head_script:"head_script"}); 
});

module.exports = router;