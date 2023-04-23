const getAllUsers=(req,res)=>{
    res.send("All Users");
    }
    
    const createUser=(req,res)=>{
        res.send("CreateUser");
    }
    const getUser=(req,res)=>{
        res.send('getUser');
    }
    const updateUser=(req,res)=>{
    res.send("updateUser");
    }
    
    const deleteUser=(req,res)=>{
        res.send("deleteuser");
    }


module.exports={
    getAllUsers,
    createUser,
    getUser,
    updateUser,
    deleteUser
}