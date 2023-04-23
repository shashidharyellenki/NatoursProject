const getAllTours=(req,res)=>{
    res.send("All Tours");
    }
    
    const createTour=(req,res)=>{
        res.send("CreateTour");
    }
    const getTour=(req,res)=>{
        res.send('getTour');
    }
    const updateTour=(req,res)=>{
    res.send("updateTour");
    }
    
    const deleteTour=(req,res)=>{
        res.send("deleteTour");
    }

module.exports={
    getAllTours,
    getTour,
    createTour,
    updateTour,
    deleteTour
}