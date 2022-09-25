const router = require('express').Router();
const category = require('../models/category');
const Product = require('../models/product');

router.post('/add', async(req, res)=>{
    try {
        let product = await new Product(req.body).save();
            res.json({ status: 200, message: "Product Added Success!", data: product });
    } catch (error) {
            res.json({ status: 400, message: "Error!", error: error });
    }
})

router.get('/getAll', async(req, res)=>{
    try {
        let product = await Product.find().populate({path:"categoryId", model:category});;
        res.json({ status: 200, message: "Product Found Success!", data: product })
    } catch (error) {
            res.json({ status: 400, message: "Error!", error: error });
    }
})

router.get('/getOne', async(req, res)=>{
    try {
        let product = await Product.findOne({_id:req.query.productId}).populate({path:"categoryId", model:category});
        res.json({ status: 200, message: "Product Found Success!", data: product });
    } catch (error) {
            res.json({ status: 400, message: "Error!", error: error });
    }
})

router.delete('/delete', async(req, res)=>{
    try {
        let product = await Product.findOneAndDelete({_id:req.query.productId});
        res.json({ status: 200, message: "Product Deleted Success!"});
    } catch (error) {
            res.json({ status: 400, message: "Error!", error: error });
    }
})

router.put('/update', async(req, res)=>{
    try {
        let product = await Product.findOneAndUpdate({_id:req.body.productId},{$set:req.body})
        console.log();
        res.json({ status: 200, message: "Product Update Success!", data: product });
    } catch (error) {
            res.json({ status: 400, message: "Error!", error: error });
    }
})

router.get('/get', async(req, res)=>{
    try {
        let product = await Product.aggregate([
            {
                $lookup:{
                    from:"categories",
                    localField:"categoryId",
                    foreignField:"_id",
                    as:"prodata"
                }
            }
        ])
        res.json({ status: 200, message: "Product FOund Success!", data: product });
    } catch (error) {
            res.json({ status: 400, message: "Error!", error: error });
    }
})

module.exports = router;

