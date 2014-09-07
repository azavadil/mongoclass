var MongoClient = require('mongodb').MongoClient;



MongoClient.connect('mongodb://localhost:27017/hw', function(err, db) {
    if(err) throw err;

    var query = {};
	var operator = { '$unset' : {'month_high': ''}}; 
	var options =  { 'multi' : true }; 
	
	db.collection('weather').update(query, operator, options, function(err, updated){ 
		if(err) throw err; 
		console.dir("updated " + updated + " documents");
	
    });
});
