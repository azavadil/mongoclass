var MongoClient = require('mongodb').MongoClient;



MongoClient.connect('mongodb://localhost:27017/weather', function(err, db) {
    if(err) throw err;

    var query = {};

    db.collection('data').find(query).sort({"State":1, "Temperature":-1}).toArray(function(err, docs) {
        if(err) throw err;

        if(docs == null) {
            return db.close();
        }
		
		console.dir("Callback reached"); 
		
		var doc = docs[0]; 
		doc['month_high'] = true; 
		db.collection('data').save(doc, function(err, saved){
			if(err) throw err; 
		}); 
		
		var last = docs[0].State; 
		for ( var i = 1; i < docs.length; i++){ 
			if ( last != docs[i].State ) { 
				var doc = docs[i]; 
				doc['month_high'] = true; 
				db.collection('data').save(doc, function(err, saved){ if (err) throw err; });
				console.dir('Update made'); 
		    }
			last = docs[i].State; 
		} 

    });
});
