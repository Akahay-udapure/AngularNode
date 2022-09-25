const mongoose = require('mongoose');

const Events = mongoose.Schema({
    name:{type:String},
    description:{type:String},
    date:{type:Date},
    // mobile:{type:Number}
});

module.exports = mongoose.model("Events", Events);