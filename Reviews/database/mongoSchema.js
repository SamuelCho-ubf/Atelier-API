// const { MongoClient } = require("mongodb");
// // Connection URL
// const url =
//   "mongodb://localhost"
// // Create a new MongoClient
// const client = new MongoClient(url);

// client.connect();

// const db = client.db("SDC");
// // const reviews = db.collection("reviews");
// db.reviews.aggregate([
//   {
//     "$lookup" : {
//       from: 'reviews_photos',
//       localField: 'review_id',
//       foreignField: 'id',
//       as: 'photos'
//     }
//   },
//   {
//     $out : "reviewsWithPhotos"
//   }], { allowDiskUse: true } );
// // define a database and collection on which to run the method
// // const db = client.db("SDC");

// // db.reviews.aggregate([
// //   { '$lookup' : {
// //       from: 'reviews_photos',
// //       localField: 'review_id',
// //       foreignField: 'id',
// //       as: 'photos'
// //     }
// //   },
// //   {$out: 'reviewsWithPhotos' }], (err, res) => {
// //     if (err) {
// //       console.log(err);
// //     } else {
// //       console.log(res);
// //     }
// //   });


//   // async function run() {
//   //   try {
//   //     await client.connect();
//   //     // define a database and collection on which to run the method
//   //     const database = client.db("SDC");
//   //     const reviews = database.collection("reviews");

//   //     reviews.aggregate([
//   //       { '$lookup' : {
//   //           from: 'reviews_photos',
//   //           localField: 'review_id',
//   //           foreignField: 'review_id',
//   //           as: 'photos'
//   //         }
//   //       },
//   //       {$out: 'reviewsWithPhotos' }], (err, res) => {
//   //         if (err) {
//   //           console.log('err@@@@@@@@@@@\n', err);
//   //         } else {
//   //           console.log('res@@@@@@@@@@@@\n', res);
//   //         }
//   //       });

//   //   } finally {
//   //     await client.close();
//   //   }
//   // }
//   // run().catch(console.dir);

  const mongo = require('mongodb');

const MongoClient = mongo.MongoClient;

const url = 'mongodb://localhost:27017';

MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {

  if (err) throw err;

  const db = client.db("SDC");

  const reviews = db.collection('reviews');
  reviews.aggregate([
    { '$lookup' : {
        from: 'reviews_photos',
        localField: 'review_id',
        foreignField: 'review_id',
        as: 'photos'
      }
    },
    {$out: 'reviewsWithPhotos' }]);
});