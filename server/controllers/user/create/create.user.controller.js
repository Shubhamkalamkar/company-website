// const User = require('../../../models/user/user.model')

// const createUser = (req, res, next) => {
//     const data = req.body
//     const currentUser = req.user
//     console.log(data)

//     if (currentUser?.role == 'admin') {
//         console.log("admin")
//         data.progress = 'inter Id assign'
//         User.findOne({ internId: data.internId }).then((duplicate) => {
//             if (!duplicate) {
//                 data.added = currentUser._id
//                 let user = new User(data)
//                 user.save().then((ok) => {
//                     res.send({ Message: "user added" })
//                 }).catch((err) => {
//                     next(err)
//                 })
//             } else {
//                 res.status(409).json({ Message: "intern id already exists" })
//             }
//         })

//     } else {
//         console.log("user")
//         const internId = req.body.internId
//         // User.findOne({ internId: internId }).then((intern) => {
//         //     if (!intern) {
//         //         res.status(401).json({ Message: "no such intern id" })
//         //     }

//         User.updateOne({ internId: internId, isUserSignup: false }, { $set: data }).then((intern) => {
//             User.updateOne({ internId: internId }, { $set: { progress: "user SignUp using intern id", isUserSignup: true } })
//             res.send({ Message: "Sign Up successfully" });
//         }).catch((err) => {
//             next(err);
//         });

//     })
// }




// }

// module.exports = createUser;





const User = require('../../../models/user/user.model');
const bcrypt = require('bcrypt');

const createUser = async (req, res, next) => {
    try {
        const data = req.body;
        const currentUser = req.user;

        if (currentUser?.role === 'admin') {

            if (data.role === 'admin') {
                if (!data.email || !data.password) {
                    res.status(503).json({ "message": "Please enter email and password" })
                }
                else {
                    let user = await User.find().where('email').equals(`${data.email}`);
                    console.log(user)
                    if (user.length>0) {
                        let err = new Error("email already used ")
                        return next(err)
                    }
                    bcrypt.hash(data.password, 10, async (err, encrypted) => {

                        if (err) {
                            err.Message = 'Something went wrong while hashing the password!';
                            if (!err.status) err.status = 503;
                            throw err;
                        }
                        else {
                            data.password = encrypted;
                            data.added = currentUser._id;
                            const user = new User(data);
                            await user.save();
                            res.send({ Message: "Admin added" });
                        }
                    })
                }
            }
            if (data.internId) {
                const duplicate = await User.findOne({ internId: data.internId });
                if (!duplicate) {
                    data.added = currentUser._id;
                    data.progress = 'inter Id assign';
                    const user = new User(data);
                    await user.save();
                    res.send({ Message: "user added" });
                } else {
                    res.status(409).json({ Message: "intern id already exists" });
                }
            }
            else{
                let err = new Error("Intern Id Required")
                next(err)
            }
        } else {
            if (!data.email || !data.password || !data.intern || !data.fullName) {
                let err = new Error("Email, password and internId needed for SignUp")
                next(err)
            }
            const internId = req.body.internId;
            const intern = await User.findOne({ internId: internId, isUserSignup: false });
            if (!intern) {
                return res.status(401).json({ Message: "no such intern id or you sign up already" });
            }
            const emailExists = await User.findOne({ email: data.email });
            if (emailExists) {
                return res.status(409).json({ Message: "email already in use" })
            }
            bcrypt.hash(data.password, 10, async (err, encrypted) => {
                try {
                    if (err) {
                        err.Message = 'Something went wrong while hashing the password!';
                        if (!err.status) err.status = 503;
                        throw err;
                    }
                    else {
                        data.password = encrypted;
                        await User.updateOne({ internId: internId, isUserSignup: false }, { $set: data });
                        await User.updateOne({ internId: internId }, { $set: { progress: "user SignUp using intern id", isUserSignup: true } });
                        res.send({ Message: "Sign Up successfully" });
                    }
                } catch (err) {
                    if (!err.Message) err.Message = 'Error while creating user';
                    if (!err.status) err.status = 400;
                    next(err);
                }
            })

        }
    } catch (error) {
        next(error);
    }
};

module.exports = createUser;
