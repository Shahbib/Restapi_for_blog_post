const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    title:{
        type: String,
        trim: true,
        required: true,
        unique: true,
    },

    body:{
        type: String,
        required: true,
    },

    username:{
        type: String,
        trim: true,
        default: "Admin",
        required: false,
    },

    category: {
        type:Array,
        required: false,
    },
    photo:{
        type:String,
    },

},
{
    timestamps: true,
}
);

const postModel = mongoose.model("post", postSchema);
module.exports = postModel;