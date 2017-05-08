var express = require('express');
var router = express.Router();
var cassandra = require('cassandra-driver');

var client = new cassandra.Client({contactPoints : ['127.0.0.1']});
client.connect(function(err,result){
	console.log('subscribers : cassandra connected');
});

getSubsciberByid = "select * from people.subscribers WHERE id = ?";

/* GET home page. */
router.get('/:id', function(req, res, next) {
 client.execute(getSubsciberByid,[req.params.id],function(err,result){
 	if(err){
 		//console.log(err);
 		res.status(404).send({msg:err})
 	}
 	else{
 		res.render('subscribers' ,{
 			id : result.rows[0].id,
 			email : result.rows[0].email,
 			first_name : result.rows[0].first_name,
 			last_name : result.rows[0].last_name
 			
 		})
 	}
 })
 
});

router.delete('/:id' , function (req,res) {
	var deleteSubscriber = "DELETE FROM people.subscribers Where id = ?";
	console.log("deleteSubscriber:",deleteSubscriber);
	client.execute(deleteSubscriber,[req.params.id] , function (err, result) {
		if(err){
			console.log("err:",err);
			res.status(404).send({msg:err})
		}else{
			res.json(result);
			
		}
	});
});

module.exports = router;
