const express = require("express");
const router = express.Router();
const mail = require("./mail");

router.use("/mail", mail);

module.exports = router;
