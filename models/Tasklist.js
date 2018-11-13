const mongoose = require('mongoose');

/* ---  MODEL --- */

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;


var TasklistSchema = new Schema({

todoItem: {
    type: String,
    required: "Item is Required"
},

completed: {
    type: Boolean,
    default: false
},
button: {
   type: String, 
   default: "far fa-circle"
}

});

// create model , using Mongoose's model method
var Tasklist = mongoose.model("Task", TasklistSchema);
// Export the model
module.exports = Tasklist;