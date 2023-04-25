const fs = require('fs');
const mongoose = require('mongoose');
const Tour = require('../../models/tourModel'); 
const dotenv = require('dotenv');
dotenv.config({path:'../../config.env'});


//Configuring the database
const DB = process.env.url.replace('<Password>', process.env.password);
mongoose.connect(DB).then(()=>console.log("Connected to the mongodb")).catch(err=>console.log(err.message))





// #region script
const tour =JSON.parse(fs.readFileSync("./tours-simple.json", "utf8"));

//#endregion


// #region Loading data to DB
const importData = async()=>{
    try{
        await Tour.create(tour);
        console.log("All tours created successfully")
    }
    catch(err){
        console.log(err.message)
    }
    process.exit();
}
// #endregion


// #region MassDelete
const DeleteData = async()=>{
    try {
        await Tour.deleteMany();
        console.log("All tours deleted succsussfully");
    } catch (error) {
        console.log(error.message)
    }
    process.exit();
}
//#endregion

if(process.argv[2] === '--import'){
    importData();
}else if(process.argv[2] === '--delete'){
    DeleteData();
}
console.log(process.argv)