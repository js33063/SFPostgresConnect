var express = require("express");
var router = express.Router();
var jsforce = require('jsforce');
// localhost:3000/aaa
var oauth2 = new jsforce.OAuth2({
    // you can change loginUrl to connect to sandbox or prerelease env.
    loginUrl: 'https://dev-pin.cs106.force.com/members',
    clientId: '3MVG9qQjGkWUbcrEPx0UB_Dt_8OiIw_9bCAlmY9FkeVce56T_NRPWWzBnBVAMBo8sC70j9eVIc7rhCIvbJtlW',
    clientSecret: '8510413236952768843',
    redirectUri: 'https://us-central1-boltconcierge-2f0f9.cloudfunctions.net/oauth2',
    response_type: 'token'



});
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
    var conn = new jsforce.Connection({
        // you can change loginUrl to connect to sandbox or prerelease env.
        loginUrl: 'https://dev-pin.cs106.force.com/members'
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

router.get('/oauth2/auth', function(req, res) {
    res.redirect(oauth2.getAuthorizationUrl({ scope: 'refresh_token full' }));
});

router.get('/oauth2/callback', function(req, res) {
    var conn = new jsforce.Connection({ oauth2: oauth2 });
    //  var code = req.param('code');
    conn.authorize('aPrxNHhdpRQk2.wcINClmZB3VzEa684t0uUcUrz5tCTqAj9H2o70om_dCUHDjiXB285eyERbIg', function(err, userInfo) {
        if (err) { return console.error(err); }
        // Now you can get the access token, refresh token, and instance URL information.
        // Save them to establish connection next time.
        console.log(conn.accessToken);
        console.log(conn.refreshToken);
        console.log(conn.instanceUrl);
        console.log("User ID: " + userInfo.id);
        console.log("Org ID: " + userInfo.organizationId);
        // ...
        res.send('success'); // or your desired response
    });
});

module.exports = router;