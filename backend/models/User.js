const mongoose = require("mongoose");
const Schema = mongoose.Schema();
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
        }
    },
    google:{
        id:{
            type:String,
        },
        email:{
            type:String,
        }
    },
    facebook:{
        id:{
            type:String,
        },
        email:{
            type:String,
        }
    },
    tabs_opened:{
        type:Number
    }
})

module.exports = User = mongoose.model("user",userSchema);