const User = require('../../../models/user/user.model');
const bcrypt = require('bcrypt');

const createUser = async (req, res, next) => {
    try {
        const data = req.body;
        const currentUser = req.user;

        if (currentUser?.role === 'admin') {

            if (data.role === 'admin') {
                console.log("added a admin")
                if (!data.email || !data.password) {
                    throw new Error("Please enter email and password");
                } else {
                    const user = await User.findOne({ email: data.email });
                    if (user) {
                        throw new Error("Email already in use");
                    }

                    const encrypted = await bcrypt.hash(data.password, 10);
                    data.password = encrypted;
                    data.added = currentUser._id;
                    const newUser = new User(data);
                    await newUser.save();
                    return res.send({ Message: "Admin added" });
                }
            }
            else {
                console.log("added user")
                if (data.internId) {
                    const duplicate = await User.findOne({ internId: data.internId });
                    if (duplicate) {
                        return res.status(409).json({ Message: "Intern ID already exists" });
                    } else {
                        data.added = currentUser._id;
                        data.progress = 'Intern ID assigned';
                        const newUser = new User(data);
                        await newUser.save();
                        return res.send({ Message: "User added" });
                    }
                } else {
                    throw new Error("Intern ID Required");
                }
            }

        } else {
            if (!data.email || !data.password || !data.internId || !data.fullName) {
                throw new Error("Email, password, and internId needed for SignUp");
            }

            const intern = await User.findOne({ internId: data.internId, isUserSignup: false });
            if (!intern) {
                return res.status(401).json({ Message: "No such intern ID or you've already signed up" });
            }

            const emailExists = await User.findOne({ email: data.email });
            if (emailExists) {
                return res.status(409).json({ Message: "Email already in use" });
            }

            const encrypted = await bcrypt.hash(data.password, 10);
            data.password = encrypted;

            await User.updateOne({ internId: data.internId, isUserSignup: false }, { $set: data });
            await User.updateOne({ internId: data.internId }, { $set: { progress: "User SignUp using intern ID", isUserSignup: true } });
            return res.send({ Message: "Sign Up successfully" });
        }
    } catch (error) {
        if (!error.message) {
            error.message = 'Error while processing the request';
        }
        if (!error.status) {
            error.status = 500;
        }
        next(error);
    }
};

module.exports = createUser;
