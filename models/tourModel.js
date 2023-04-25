const mongoose = require('mongoose');
const { stringify } = require('nodemon/lib/utils');

//Schema
const tourSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true, 'Null value of the tour can\'t be accecpted '],
        unique:[true, 'Tour alread existed'],
        trim:true
    },
    price:{
        type:Number,
        required:[true, 'Pirce is missing']
    },
    rating:{
        type:Number,
        default:4.5
    },
    ratingAverage:{
        type:Number,
        default:4.5
    },
    ratingQuantity:{
        type:Number,
        default:0
    },
    difficulty:{
        type:String,
        required:[true, 'A tour must have a difficulty level']
    },
    maxGroupSize:{
        type:Number,
        required:[true, 'A tour must have a max group size']
    },
    duration:{
        type:Number,
        required:[true, 'A tour must have a the number of durations']
    },
    priceDiscount:{
        type:Number
    },
    summary:{
        type:String,
        trim:true,
        required:[true, 'A tour must have its summary']
    },
    description:{
        type:String,
        trime:true,
    },
    imageCover:{
        type:String,
    },
    images:[String],
    createdAt:{
        type:Date,
        default:Date.now(),
        select:false //In this way we never display tis field to the client, but can be visible in the database
    },
    startDates:[Date]
});
//registering the schema with the MongoDb
const Tour = mongoose.model('Tour',tourSchema);


module.exports = Tour