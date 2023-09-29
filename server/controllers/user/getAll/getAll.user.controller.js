const User = require('../../../models/user/user.model')

const getAll = (req, res, next) => {

    try {
        let currentUser = req.user
        if (currentUser.role === 'admin') {
            User.find().then((users) => {
                if (!users) {
                    let err = new Error("no user found")
                    next(err)
                }
                else {
                    res.status(200).json(users)
                }
            }).catch((err) => {
                next(err)
            })
        } else {
            let err = new Error('you are not authorized to perform this action')
            next(err)
        }
    } catch (error) {
        next(error)
    }
}

module.exports = getAll