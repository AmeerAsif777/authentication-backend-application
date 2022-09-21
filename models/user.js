const mongoose = require("mongoose");
const schema = mongoose.Schema;


// Schema for User profile

const profile = new schema({
    user_name : {
        type: String,
        required: true,
        unique: true,
    },

    password : {
        type : String,
        required : true
    },

    user_email : {
        type : String,
        required : true,
        unique: true,
    },

    user_pic : {
        type : Buffer,
        contentType : String
    },
}
);


const User = mongoose.Model("User", profile);
export default User;


