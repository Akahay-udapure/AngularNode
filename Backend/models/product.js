const mongoose = require('mongoose');
const category = require('./category');

const Product = mongoose.Schema({
    productName:{type:String},
    price:{type:String},
    categoryId:{type:String, refer:category},
    summery:{type:String}
});

module.exports = mongoose.model("Product", Product);