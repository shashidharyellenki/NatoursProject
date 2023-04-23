const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');
dotenv.config({path:'./config.env'});

//Configuring the database
const DB = process.env.url.replace('<Password>', process.env.password);
mongoose.connect(DB).then(()=>console.log("Connected to the mongodb")).catch(err=>console.log(err.message))

//Schema
const tourSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true, 'Null value of the tour can\'t be accecpted '],
        unique:[true, 'Tour alread existed']
    },
    price:{
        type:Number,
        required:[true, 'Pirce is missing']
    },
    rating:{
        type:Number,
        default:4.5
    }
});
//registering the schema with the MongoDb
const Tour = mongoose.model('Tour',tourSchema);

//creating the new  test tour in the database 

const testTour = new Tour({
    name:'Hyderabad', 
    price:2000,
    rating:3.0
});

//saving the tour to the database
testTour.save().then(doc=>console.log(doc)).catch(err=>console.log(err.message));

app.listen(process.env.port,()=>{
    console.log("server started")
})