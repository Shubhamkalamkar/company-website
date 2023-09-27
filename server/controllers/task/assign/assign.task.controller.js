const User = require("../../../models/user/user.model");
const mongoose = require('mongoose')

const assign = async (req, res, next) => {
    let data = req.body;
    let taskId = data.taskId;

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
        res.status(200).send("Tasks assigned");
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}

module.exports = assign;
