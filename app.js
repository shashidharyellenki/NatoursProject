const express = require('express');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');



const app= express();
app.use(express.json()) //This middlewear is soo important
app.use(express.static(`${__dirname}/public`))

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports=app
// password - 0Pzjjt8oRLN84GyF
// URI - mongodb+srv://devwork1009:<password>@cluster0.an947hr.mongodb.net/test