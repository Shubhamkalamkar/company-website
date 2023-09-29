const User = require("../../../models/user/user.model")


const getById = (req,res,next)=>{
    try{
        let currentUser = req.user
        if (currentUser.role === 'admin') {
        let id = req.params.id
        if(!id){
            let err = new Error("id required")
            return next(err)
        }
        User.findById(id).then((user)=>{
            if(!user){
                let err = new Error("user not found")
                return next(err)
            }
            res.status(201).json({Message:"success",user: user})
        }).catch((err)=>{
            return 	next(err);
        })
    } else {
        let err = new Error('you are not authorized to perform this action')
        next(err)
    }
    } catch(error){
        next(error)
    }
}

module.exports = getById