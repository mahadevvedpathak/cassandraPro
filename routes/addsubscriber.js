var express = require('express');
var router = express.Router();
var cassandra = require('cassandra-driver');

var client = new cassandra.Client({contactPoints : ['127.0.0.1']});
client.connect(function(err,result){
	console.log('addsubscriber : cassandra connected');
});

getSubsciberByid = "select * from people.subscribers WHERE id = ?";

/* GET home page. */
router.get('/', function(req, res, next) {
 		res.render('addsubscriber');
});

//POST Add subscriber 
router.post('/', function(req,res){
	var id = cassandra.types.uuid(); 
	var upsertsubscriber = 'INSERT Into people.subscribers(id , email , first_name, last_name) VALUES(?,?,?,?)';
	client.execute(upsertsubscriber , [id, req.body.email, req.body.first_name , req.body.last_name] , function(err ,result){
		if(err){
 			res.status(404).send({msg:err})
 	}
 	else{
 		console.log('subscriber Added');
 		res.redirect('/');
 	}
	});
});



module.exports = router;
