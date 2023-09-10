const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema

const userSchema = new Schema(
    {
        firstName: {
            type: String,
            require: true
        },
        lastName: {
            type: String,
            require: true
        },
        internId: {
            type: Number,
            require: true,
            unique: true
        },
        role:{
            type:String,
            require:true
        },
        mobileNumber: {
            type: Number,
            require: true
        },
        dateOfBirth: {
            type: String,
            require: true
        },
        internshipType: {
            type: String,
            require: true
        },
        email: {
            type: String,
            require: true,
            unique: true
        },
        password: {
            type: String,
            require: true
        }

    }
)

// Define the comparePassword method
userSchema.methods.comparePassword = function (candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
      if (err) return callback(err);
      callback(null, isMatch);
    });
  };

const User = mongoose.model("User", userSchema);
module.exports = User