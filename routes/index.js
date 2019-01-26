var express = require("express");
var router = express.Router();

// localhost:3000/aaa

/* GET home page. */
router.get("/", function(req, res, next) {
    res.render("case", { msg: "Welcome" });
});

router.get("/casesubmit", function(req, res, next) {
    res.render("casesubmit", { msg: "Welcome" });
});

router.get("/live", function(req, res, next) {
    res.render("live", { msg: "Welcome" });
});


module.exports = router;