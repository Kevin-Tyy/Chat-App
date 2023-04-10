const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique : true,
        lowercase : true,
        trim: true,
    },
    password : {
        type : String,
        required : true,
        trim: true,

    }

}, {timestamps : true});

const UserModel = mongoose.model('User', UserSchema);


module.exports = UserModel;