const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const userSchema = new Schema({
    method:{
        type:String,
        required:true,
        enum:['local','google','facebook']
    },
    local:{
        email:{
            type:String
        },
        name:{
            type:String
        },
        password:{
            type:String
        }
    },
    google:{
        id:{
            type:String,
        },
        email:{
            type:String,
        },
        name:{
            type:String
        }
    },
    facebook:{
        id:{
            type:String,
        },
        email:{
            type:String,
        },
        name:{
            type:String,
        }

    },
    tabs_opened:{
        type:Number,
        required:true
    },
    isVerified:{
        type:Boolean,
        default: false
    },
    dateCreated: {
        type: Date,
        required: true,
        default: Date.now
    }
})

module.exports = User = mongoose.model('users',userSchema);
