const Task = require("../../../models/task/task.model");


const getById = (req, res, next) => {
    let id = req.params.id;
    if (!id) {
        let err = new Error("please send id")
        return next(err)
    }
    try {
        Task.findOne({ _id: id }).then((task) => {
            if (task) {
                res.status(200).send(task)
            }
            else {
                let err = new Error("no task found")
                next(err)
            }
        })
    } catch (error) {
        next(error)
    }
}

module.exports = getById