var mongodb = require('mongodb');
test = require('assert');

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
    rating: 'PG',
    ratings: {
      critics: 80,
      audience: 97
    },
    screenplay: ['Peter Benchley', 'Carl Gotlieb']
  }

  db.collection("movies").remove({"title": "Jaws"});

  db.collection("movies").find({"title": "Jaws"}).toArray().then(function(docs) {
    if (error) {
      console.log(error);
      process.exit(1);
    }

    inserted = false;

    // checking if the movie isn't already at the db
    if (docs.length == 0) {

        db.collection('movies').find(jawsDoc).toArray(function(error, result) {
          if (error) {
            console.log(error);
            process.exit(1);
          }

          if (!result.length) {
            db.collection('movies').insert(jawsDoc, function(error, result) {
              if (error) {
                console.log(error);
                process.exit(1);
              }
              inserted = true;
              console.log("value of inserted: " + inserted);
            });
          }
        });
    } else {
      inserted = true;
    }

    tries = 0;
    while(!inserted) {
      tries += 1;
      setTimeout(
        function() {
          console.log("inserted? " + inserted);
          //console.log("tries: " + tries)
          //if (tries > 100) {
            process.exit(1);
          //}
        }, 2000);
    }

    // find using a year
    var query = { year: 1975 };
    db.collection('movies').find(query).toArray(function(error, docs) {
      if (error) {
        console.log(error);
        process.exit(1);
      }

      console.log("Movies found:\n");
      docs.forEach(function(doc) {
        console.log(JSON.stringify(doc));
      });
    });

    // improving the query
    query.screenplay = 'Carl Gotlieb';
    db.collection('movies').find(query).toArray(function(error, docs) {
      if (error) {
        console.log(error);
        process.exit(1);
      }

      console.log("Movies found (using screenplay):\n");
      docs.forEach(function(doc) {
        console.log(JSON.stringify(doc));
      });
      process.exit(0);
    });
  });
});
