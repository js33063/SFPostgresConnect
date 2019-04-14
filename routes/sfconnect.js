var express = require("express");
const { Client } = require('pg');
var router = express.Router();

var client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});


router.get("/", function(req, res, next) {
  client.connect();

  client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
    if (err) throw err;
    for (let row of res.rows) {
      console.log(JSON.stringify(row));
    }
    client.end();
  });
});
module.exports = router;

