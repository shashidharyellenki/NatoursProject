const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');
dotenv.config({path:'./config.env'});

//Configuring the database
const DB = process.env.url.replace('<Password>', process.env.password);
mongoose.connect(DB).then(()=>console.log("Connected to the mongodb")).catch(err=>console.log(err.message))


app.listen(process.env.port,()=>{
    console.log("server started")
})