const mongoose = require("mongoose")

const bookSchema = new mongoose.Schema({
    Title: {
        type: String,
        required: true
    },
    Author: {
        type: String,
        required: true
    },
    Genre: {
        type: String,
        enum: ["Fiction", "Science", "Comic"],
        required: true
    },
    Description: {
        type: String,
        required: true
    },
    Price: {
        type: Number,
        required: true
    }
},
{   
    versionKey: false
});

const Book=mongoose.model("Book",bookSchema)

module.exports={
    Book
}