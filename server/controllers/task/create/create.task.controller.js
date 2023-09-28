const { default: mongoose } = require("mongoose");
const Task = require("../../../models/task/task.model");

const create = (req, res, next) => {
    let data = req.body;
    console.log(data)
    const currentUser = req.user;
    let referenceImg = req.file?.path;
    // console.log()
    
    if (!referenceImg) {
        let err = new Error("upload reference image");
        return next(err);
    }
    data.referenceImg = referenceImg;
    data.created= currentUser._id;
    let task = new Task(data);
    task.save().then((data) => {
        res.status(200).send({Message:"task saved successfully"});
    }).catch((err) => {
        if (err.code === 11000) {
            // Duplicate key error, handle it here
            console.log(err.message)
            let error = new Error("Duplicate Id")
            return next(error)
        } else {
            // Handle other types of errors
            console.log(err.message)
            let error = new Error("something went wrong")
            return next(error)
        }
    })
};

module.exports = create;
