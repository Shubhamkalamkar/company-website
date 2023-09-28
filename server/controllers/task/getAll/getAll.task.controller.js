const Task = require('../../../models/task/task.model')
const User = require('../../../models/user/user.model')

const getAll = (req,res,next)=>{
    try {
        let currentUser = req.user
        console.log(currentUser)
        if(currentUser.role === 'admine'){
            Task.find().then((tasks)=>{
                if(tasks){
                    res.status(200).send(tasks)
                }
                else{
                    let err = new Error("no task found")
                    next(err)
                }
            })
        }
        else{
            User.findById("6514208cb5fa12221b4b91b9").populate('tasks.taskId').then((tasks)=>{
                if(tasks.tasks){
                    res.status(200).send(tasks.tasks)
                }
                else{
                    let err = new Error("no assign task")
                    next(err)
                }
            })
        }
        
    } catch (error) {
        next(error)
    }
}

module.exports = getAll