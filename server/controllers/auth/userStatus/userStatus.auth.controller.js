const User = require('../../../models/user/user.model')

const userStatus = (req,res,next)=>{
    let currentUser = req.user

    try {
        User.findById(currentUser._id).then((user)=>{
            if(!user){
                let err = new Error("user not found")
                next(err)
            }
            else{
                res.status(200).send(user)
            }
        })
    } catch (error) {
        next(error)
    }
}

module.exports = userStatus