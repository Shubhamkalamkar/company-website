const errorHandler = (error,req,res,next)=>{
if(!error.status) error.status=500;
if(!error.message) error.message = "internal Server Error"
res.status(error.status).json({"Message":error.message});
console.log(error)
}

module.exports = errorHandler;