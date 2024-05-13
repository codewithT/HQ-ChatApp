const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
   // userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
   // username : {type : String , required : true}, 
    senderid : {type : String , required : true},
   receiverid : {type: String, required : true},
    socketid : {type: String },
    content : { type: String , required: true }

    // Add other fields as needed for content management
});

module.exports = mongoose.model('Content', contentSchema);
