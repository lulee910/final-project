const express = require("express");
const bodyParser = require('body-parser');
const router = express.Router();


router.get("/", async (req, res) =>{
    res.render("sys/test", {}); 
});

module.exports = router;