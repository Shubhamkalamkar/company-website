const Task = require("../../../models/task/task.model");
const User = require("../../../models/user/user.model");
const mongoose = require('mongoose')

const assign = async (req, res, next) => {
    let data = req.body;
    let taskId = data.taskId;
    let internsIds = data.interns;

    try {
        const promises = data.interns.map(async (userId) => {
            const user = await User.findOne({ internId: userId });

            if (user) {
                user.tasks.push({ taskId });
                await user.save();
                console.log(`Task added to user with ID ${userId}`);
            } else {
                console.log(`User with ID ${userId} not found`);
            }
        });

        await Promise.all(promises);
        const task = await Task.findOne({ _id: taskId });
        if (!task) {
            let err = new Error("Task not found");
            return next(err);
        }
        // Check if any of the internIds are already assigned to this task
        const alreadyAssigned = task.assigned.some(assignment => internsIds.includes(assignment.internId));

        if (alreadyAssigned) {
            return res.status(200).json({ message: "One or more interns are already assigned to this task" });
        }
        // Update the assigned array with the new assignments
        task.assigned.push(...internsIds.map(internId => ({ internId })));
        await task.save();
        res.status(200).send("Tasks assigned");
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}

module.exports = assign;
