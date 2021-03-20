const mongoose = require('mongoose');
const db = mongoose.connect('mongodb://localhost/SDC', {useNewUrlParser: true, useUnifiedTopology: true});

const dataSchema = new mongoose.Schema({});
const Review = mongoose.model('review', dataSchema, 'reviews');
// const Photo = mongoose.model('photo', dataSchema, 'reviews_photos');

// Review.find({})
//   .then((res) => {
//     console.log('rese',res);
//   })
//   .catch((err) => {
//     console.log('err: ', err);
//   })

// Photo.find({})
//   .then((res) => {
//     console.log('rese',res);
//   })
//   .catch((err) => {
//     console.log('err: ', err);
//   })

// Review.aggregate()
//   .lookup({
//     from: 'reviews_photos',
//     localField: 'id',
//     foreignField: 'review_id',
//     as: 'photos'
//   })
//   .exec((err, res) => {
//     if (err) console.log(err);
//     console.log(res);
//   })
  // .then((result) => {
  //   console.log('result: ', result);
  // })
  // .catch((err) => {
  //   console.log('err: ', err);
  // })

// Review.aggregate([
//   // {
//   //   $match : {id:1}
//   // },
//   {
//     $group : {
//       _id: "$id",
//       rating: {"$first" : "$rating"}
//     }
//   }
// ], )
// .exec((err, res) => {
//   if (err) console.log(err);
//   console.log(res);
// })

Review.aggregate([
  {
    $group : {
      _id: "$id",
      review_id: {"$first" : "$id"},
      rating: {"$first" : "$rating"}
    }
  },
  {
    $lookup : {
      from: 'reviews_photos',
      localField: 'review_id',
      foreignField: 'review_id',
      as: 'photos'
    }
  },
  {
    $out: 'reviewsWithPhotos'
  }
])
.allowDiskUse(true)
.exec((err, res) => {
  if (err) console.log(err);
  console.log(res);
})

// .then((result) => {
//   console.log('result: ', result);
// })
// .catch((err) => {
//   console.log('err: ', err);
// })

// reviews.aggregate([
//   { '$lookup' : {
//       from: 'reviews_photos',
//       localField: 'review_id',
//       foreignField: 'id',
//       as: 'photos'
//     }
//   },
//   {'$out' : "reviewsWithPhotos" }], (err, res) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log(res);
//     }
//   });
  // { allowDiskUse: true } );

  //   db.characteristicReviews.aggregate([
  //     { '$lookup' : {
  //     from: 'characteristics',
  //     localField: 'id',
  //     foreignField: 'characteristic_id',
  //     as: ''
  //     }
  //     },
  //     {'$project' : {
  //     'photos': {
  //     'id': 1,
  //     'url': 1,
  //     }
  //     }
  //     },
  //     {$out: 'reviewsWithPhotos' }
  //     ],
  //     { allowDiskUse: true }, )

  //     db.reviews.updateMany( {}, { $rename: { 'id': 'review_id' } })

  // > db.reviews.aggregate([
  //   {
  //     $lookup: {
  //       from : 'reviews_photos',
  //       localField: 'review_id',
  //       foreignField: 'id',
  //       as: 'photos'
  //     }
  //   },
  //   {
  //     $out: 'reviewsWithPhotos'
  //   }], {allowDiskUse: true})