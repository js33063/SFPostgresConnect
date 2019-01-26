var express = require("express");
var sf = require('node-salesforce');
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

router.get("/sf", function(req, res, next) {
    var conn = new sf.Connection({
        oauth2: {
            // you can change loginUrl to connect to sandbox or prerelease env.
            loginUrl: 'https://dev-pin.cs106.force.com/members',
            clientId: '3MVG9qQjGkWUbcrEPx0UB_Dt_8OiIw_9bCAlmY9FkeVce56T_NRPWWzBnBVAMBo8sC70j9eVIc7rhCIvbJtlW',
            redirectUri: 'https://dev-pin.cs106.force.com/members/services/oauth2/success',
            response_type: 'token',
            scope: 'refresh_token full'

        }
    });
    conn.login('kajal@plus91labs.com', 'member@2018', function(err, userInfo) {
        if (err) { return console.error(err); }
        // Now you can get the access token and instance URL information.
        // Save them to establish connection next time.
        console.log(conn.accessToken);
        console.log(conn.instanceUrl);
        // logged in user property
        console.log("User ID: " + userInfo.id);
        console.log("Org ID: " + userInfo.organizationId);
        // ...
    });
});

module.exports = router;