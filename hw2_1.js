var MongoClient = require('mongodb').MongoClient;


function compare(d1, d2){ 
	if (d1.Temperature < d2.Temperature ) return -1; 
	if (d1.Temperature > d2.Temperature ) return 1; 
	else return 0; 
}

MongoClient.connect('mongodb://localhost:27017/course', function(err, db) {
    if(err) throw err;

    var query = { 'Wind Direction' : { '$gte' : 180, '$lte' : 360 } };

    db.collection('weather').find(query).toArray(function(err, docs) {
        if(err) throw err;

        if(docs == null) {
            return db.close();
        }
			
		docs.sort(compare); 
		
        console.dir(docs[0]);
    });
});
