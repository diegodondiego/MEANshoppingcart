var mongodb = require('mongodb');

var uri = "mongodb://localhost:27017/example";

mongodb.MongoClient.connect(uri, function(error, db) {

  if (error) {
    console.log(error);
    process.exit(1);
  }

  var jawsDoc = {
    title: 'Jaws',
    year: 1975,
    director: 'Steven Spielberg',
    rating: 'PG'
  }

  db.collection('movies').insert(jawsDoc, function(error, result) {
    if (error) {
      console.log(error);
      process.exit(1);
    }

    db.collection('movies').find().toArray(function(error, docs) {
      if (error) {
        console.log(error);
        process.exit(1);
      }

      console.log("Movies founded:\n");
      docs.forEach(function(doc) {
        console.log(JSON.stringify(doc));
      });
      process.exit(0);
    });
  });
});
