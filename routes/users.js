var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));


/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('I am from user router.');
});

router.get('/login', function(req, res, next) {
    res.render('login');
});



module.exports = router;