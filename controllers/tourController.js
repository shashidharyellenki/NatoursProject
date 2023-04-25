const match = require('nodemon/lib/monitor/match');
const Tour = require('./../models/tourModel');

/**
 * 
 * @Alternative_ways_to_write_queries
 * 
 * const allTours = awaut Tour.find({
 *  duration:req.query.duration
 * })
 * 
 * const allTours = await Tour.find().where('duration').equals(req.query.duration).where('difficulty').equals('easy')
 */

const getAllTours= async (req,res)=>{

        try{
            //Basic Filtering
            const queryObject = {...req.query};
            const excludedFields = ['sort','page','limit','fields'];
            excludedFields.forEach(el=> delete queryObject[el]) 

            //Advance Filtering
            let queryStr = JSON.stringify(queryObject)
            queryStr =  queryStr.replace(/\b(gte|lt|lte|gt)\b/g, match=> `$${match}`)
            // console.log(JSON.parse(queryStr));

            let query =  Tour.find(JSON.parse(queryStr));
            //Applying sort funcationaly
            if(req.query.sort){
                const sortBy = req.query.sort.split(',').join(' ');
                query = query.sort(sortBy);
            }else{
                query = query.sort('-createdAt')
            }

            //Applying limit functionaltu
            if(req.query.fields){
                const fields = req.query.fields.split(',').join(' ') // price ratingAverage
                query = query.select(fields)
            }else{
                query = query.select('-__v') // - ressembels the exclude function
            }

            //pagination
            const page = req.query.page *1 || 1;
            const limit = req.query.limit*1 || 100;
            const skip = (page-1)*limit;

            query = query.skip(skip).limit(limit)

            if(req.query.page){
                const numTours = await Tour.countDocuments();
                if(skip>=numTours) throw new Error('page doesnt exist')
            }
            // const allTours = await Tour.where('duration').lte(queryObject['duration']).where('difficulty').equals(queryObject['difficulty'])
            //the query variable will bring all the queris in the query variable
            const allTours = await query
            res.status(200).json({
                data:{
                    tours:allTours
                },
                message:"Success",
                status:"Completed",
                length:allTours.length
            })
        }catch(err){
            res.status(500).json({
                message:err.message,
                status:"Fail"
            })
        }
    }

    const getTour= async (req,res)=>{
        const {id} = req.params;
        try{
            const tour = await Tour.findById(id); 
            //we can also find using findByOne
            //const tour = await Tour.findByOne(_id: id) we are trying to find by using Id
            res.status(200).json({
                message:"Data retrieved Successfully",
                data:tour,
                status:"Completed"
            })
        }catch(err){
            res.status(500).json({
                message:err.message,
                status:"Failed"
            })
        }

 
       
    }
    
    const createTour= async(req,res)=>{
        console.log(req.body)
            //Inorder to catch the errors for the async and await we can use try and catch blocks
            try{
                //returns a promise and we should save this promise
               const newTour= await Tour.create(req.body);
                res.status(200).json({
                    message:"Tour created Sucessfully",
                    status:"Success",
                    tour: newTour
                });
            }
            catch(err){
                res.status(500).json({
                    message:err.message,
                    status:"Fail"
                });
            }

    }

    const updateTour= async (req,res)=>{
        try{
            const updatedTour = await Tour.findByIdAndUpdate(req.params.id, req.body, {new:true, runValidators:true}) //new:true -> returns the updated document when we retrive the data from DB, runvalidators will run the condtions given in the model
            res.status(200).json({
                message:"Document Updated Sucessfully",
                status:true,
                data:updatedTour
            })
        }catch(err){
            res.status(500).json({
                message:err.message,
                status:"Fail"
            });
        }

    }
    
    const deleteTour= async (req,res)=>{
        try{
            const deleteTour = await Tour.findOneAndDelete(req.params.id)
            res.status(201).json({
                message:"Document Delted Successfully",
                status:true
            })
        }catch(err){
            res.status(500).json({
                message:err.message,
                status:"Fail"
            });
        }
    }

module.exports={
    getAllTours,
    getTour,
    createTour,
    updateTour,
    deleteTour
}