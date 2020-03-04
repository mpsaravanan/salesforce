var express = require('express');
var jsforce = require('jsforce');

var router = express.Router();

//Salesforce Connection..
const conn = new jsforce.Connection({
  instanceUrl : 'https://ap16.salesforce.com/',
  accessToken : '00D2w000003NZuv!ARoAQEpEbJALmYfRIbd9ZZtd4VXqSljFldyoCs4l3OU6MQd9f5Zsos9eQj1YFAKIM0SOebt_KoYw0Mbkm69AZm7eo5cHduGq'
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Assignment'});
});

/* Show Contacts */
router.get('/show', (req, res) => {
	var records = [];
	conn.query("SELECT Id, Name FROM Account", function(err, result) {
	  if (err) { return console.error(err); }
	  res.render('show', { title: 'Show Contacts' , result: result.records});
	});
	
});

/* Create Contact Form */
router.get('/create', (req, res) => {
	res.render('create', { title: 'Create Contact' });
});

router.post('/createcontact', (req, res) => {
	conn.sobject("Account").create({ Name : req.body.name }, function(err, ret) {
	  if (err || !ret.success) { return console.error(err, ret); }
	  res.render('createcontact', { title: 'Create Contact' });
	});
	
});


module.exports = router;
