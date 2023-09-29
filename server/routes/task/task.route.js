const taskController = require('../../controllers/task/main.task.controller')
const checkAdminAuth = require('../../middlewares/admin-auth')
const authentication = require('../../middlewares/authentication')
const multer = require('multer')
const path = require('path')
const Task = require('../../models/task/task.model')

const taskRoute = require('express').Router()


const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log("here is file", file)
        if (file.fieldname === 'referenceImg' && file.mimetype === 'image/png') {
            cb(null, path.join('assets', 'tasks', 'images'));
        }
    },
    filename: async (req, file, cb) => {
        console.log("check here body", req.body._id);
        // console.log(typeof(req.body._id))
        if (req.body._id == 'null'||req.body._id == 'undefined') {
            // console.log("first")
            return cb({ message: ' Id required' })
        }
        let duplicate = await Task.findOne({ _id: req.body._id })
        console.log(duplicate)
        if (duplicate) {
            return cb({ message: 'duplicate Id' })
        }

        if (file.fieldname === 'referenceImg') {
            const uniqueFileName = `task_${req.body._id}_${Date.now()}.${file.mimetype.split('/')[1]}`;
            cb(null, uniqueFileName);
        }
    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png') {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
}


taskRoute.post('/create', authentication, checkAdminAuth, multer({ storage: fileStorage, fileFilter: fileFilter }).single('referenceImg'), taskController.create)
taskRoute.post('/assign', authentication, checkAdminAuth, taskController.assign)
taskRoute.get('/getall', authentication, taskController.getAll)
taskRoute.get('/getbyid/:id', taskController.getbyid)
taskRoute.get('/checktaskassign', taskController.checkTaskAssign)

module.exports = taskRoute