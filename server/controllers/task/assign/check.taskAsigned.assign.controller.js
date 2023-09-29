const User = require("../../../models/user/user.model")


const checkTaskAssignOrNot = async (req, res, next) => {
    try {
        let internId = req.query.internId
        let taskId = req.query.taskId
        console.log(internId, taskId)
        if (!internId || !taskId) {
            let err = new Error("InternId And TaskId required")
            return next(err)
        }

        const user = await User.findOne({ internId: internId });
        console.log(user)
        if (user && user.tasks.some(task => task.taskId === taskId)) {
            // TaskId is present in tasks array
            return res.status(200).json({ message: "TaskId is present in tasks array", addInArray: false });
        } else {
            // TaskId is not present in tasks array
            return res.status(200).json({ message: "TaskId is not present in tasks array", addInArray: true });
        }

    } catch (error) {
        next(error)
    }
}

module.exports = checkTaskAssignOrNot