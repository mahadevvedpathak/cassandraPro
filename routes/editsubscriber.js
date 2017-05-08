var express = require('express');
var router = express.Router();
var cassandra = require('cassandra-driver');

var client = new cassandra.Client({contactPoints : ['127.0.0.1']});
client.connect(function(err,result){
	console.log('editsubscriber : cassandra connected');
});

getSubsciberByid = "select * from people.subscribers WHERE id = ?";


/* GET home page. */
router.get('/:id', function(req, res, next) {
 client.execute(getSubsciberByid,[req.params.id],function(err,result){
 	if(err){
 		res.status(404).send({msg:err})
 	}
 	else{
 		res.render('editsubscriber' ,{
 			id : result.rows[0].id,
 			email : result.rows[0].email,
 			first_name : result.rows[0].first_name,
 			last_name : result.rows[0].last_name
 			
 		})
 	}
 })
 
});

module.exports = router;

//POST Edit subscriber 
router.post('/:id', function(req,res){
	console.log("Calling Edit subscribers....");
	var updatesubscriber = 'INSERT Into people.subscribers(id , email , first_name, last_name) VALUES(?,?,?,?)';
	client.execute(updatesubscriber , [req.body.id, req.body.email, req.body.first_name , req.body.last_name] , function(err ,result){
		if(err){
 			res.status(404).send({msg:err})
 	}
 	else{
 		console.log('subscriber updated');
 		res.redirect('/');
 	}
	});
});



module.exports = router;
