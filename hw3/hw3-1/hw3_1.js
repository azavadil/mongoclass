var MongoClient = require('mongodb').MongoClient;


var delMin = function(arr){

	var min = Number.POSITIVE_INFINITY; 
	var idx = -1; 
	
	for (var i = 0; i < arr.length; i++){ 
		if ( arr[i].type === "homework" && arr[i].score < min ) { 
			min = arr[i].score; 
			idx = i; 
		}
	}
	if (idx == -1) throw err; 
	
	arr.splice(idx,1);
	
}

MongoClient.connect('mongodb://localhost:27017/school', function(err, db) {
    if(err) throw err;

    var query = {};

    db.collection('students').find().toArray( function(err, docs) {
        if(err) throw err;

        if(docs == null) {
            return db.close();
        }
		
		console.dir("Callback reached"); 
		
		docs.forEach( function( doc ) { 
			delMin(doc.scores); 
			db.collection('students').save(doc, function(err, saved) { 
				if(err) throw err; 
				return db.close(); 
			}); 
		});  

    });
});
