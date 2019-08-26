var express = require("express");
var router = express.Router();
var jsforce = require('jsforce');
const { Client } = require('pg');
var rn = require('random-number');
var springedge = require('springedge');
var otpGenerator = require('otp-generator');
var otp=otpGenerator.generate(4, { upperCase: false, specialChars: false,digits:true,alphabets:false });
var gen = rn.generator({
  min:  10000000
, max:  99999999
, integer: true
})
var apiai = require('apiai');
var apiapp = apiai("2cf124ce145f47479e93874e8179628f");
// localhost:3000/aaa
var oauth2 = new jsforce.OAuth2({
    // you can change loginUrl to connect to sandbox or prerelease env.
    loginUrl: 'https://dev-pin.cs106.force.com/members',
    clientId: '3MVG9qQjGkWUbcrEPx0UB_Dt_8OiIw_9bCAlmY9FkeVce56T_NRPWWzBnBVAMBo8sC70j9eVIc7rhCIvbJtlW',
    clientSecret: '8510413236952768843',
    redirectUri: 'https://us-central1-boltconcierge-2f0f9.cloudfunctions.net/oauth2',
    response_type: 'token'
});

var client = new Client({
    connectionString: 'postgres://ztofmzxuprvzke:6fe148964f7f25e2602cea7836bbb9f8f5b0b99cca8dbbafac4902d638686209@ec2-54-83-61-142.compute-1.amazonaws.com:5432/d31aef7km7hgds',
    ssl: true,
  });
/* GET home page. */
router.get("/", function(req, res, next) {
    res.render("case", { msg: "Welcome" });
});

router.get("/bot", function(req, res, next) {
  console.log('prashantbot-kpmg');
  res.render("bot", { msg: "Welcome" });
});

router.get("/plus91labsbot", function(req, res, next) {
  console.log('prashantbot-plus91labs');
  res.render("plus91labsbot", { msg: "Welcome" });
});

router.get("/chatbot", function(req, res, next) {
  console.log('jsbot-kpmg');
  res.render("jsbot", { msg: "Welcome" });
});


router.get("/casesubmit", function(req, res, next) {
    res.render("casesubmit", { msg: "Welcome" });
});

router.post('/mysfbot', function(req, res){
  console.log(req.body.chatText);
  var request = apiapp.textRequest(req.body.chatText, {
    sessionId: '123123'
  });
  request.on('response', function(response) {
      console.log(response);
      res.send(response);
  });
  request.on('error', function(error) {
      console.log(error);
      res.send(error);
  });
  request.end();
});

//To send SMS
router.post('/sendSms', function(req, res, next) {
  var params = {
  'sender': 'SEDEMO',
  'apikey': '6n7h4wv5yte7t87qxp4vmrfh96tu0el7',
  'to': [
    '91'+req.body.mobile  //Moblie Numbers 
  ],
  'message': otp+" Your bot verfication code",
  'format': 'json'
};
 
springedge.messages.send(params, 5000, function (err, response) {
  if (err) {
    return console.log(err);
  }
  console.log(response);
  res.send('otp send');
  return res.status(200).json({'otp':otp});
});
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
router.get("/getallCases", function(req, res, next) {
    client.connect();
    client.query('SELECT * from salesforce.case;', (err, result) => {
      if (err) throw err;
      res.json(result);
    });
    
  });

  router.post("/insertAccount", function(req, res, next) {
      console.log(req.body);
      if(req.body!=null || req.body!=''){
   var q ="INSERT INTO salesforce.account (Name, Phone, PostgresId__c) VALUES('"+req.body.name+"','"+req.body.phone+"','"+gen()+"');";
    client.connect();
    client.query(q, (err, result) => {
      if (err) throw err;
      res.json(result);
    });
   }
  });


module.exports = router;