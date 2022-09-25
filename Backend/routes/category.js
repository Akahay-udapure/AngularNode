const router = require('express').Router();
const Category = require('../models/category');
const Product = require('../models/product');


router.post('/add', async(req, res)=>{
    try {
        let category = await new Category(req.body).save();
        res.json({ status: 200, message: "Category Added Success!", data: category });
    } catch (error) {
            res.json({ status: 400, message: "Error!", error: error });
    }
})

router.get('/getAll', async(req, res)=>{
    try {
        let category = await Category.find();
        res.json({ status: 200, message: "Category Found Success!", data: category });
    } catch (error) {
            res.json({ status: 400, message: "Error!", error: error });
    }
})

router.get('/getOne', async(req, res)=>{
    try {
        let category = await Category.findOne({_id:req.query.categoryId});
        res.json({ status: 200, message: "Category Found Success!", data: category });
    } catch (error) {
            res.json({ status: 400, message: "Error!", error: error });
    }
})

router.delete('/delete', async(req, res)=>{
    try {
        let catData = await Product.findOne({categoryId:req.query.categoryId});
        if(catData){
            res.json({ status: 400, message: "Category Contain Products First Delete Them!"});
        }else{
            let category = await Category.findOneAndDelete({_id:req.query.categoryId});
            res.json({ status: 200, message: "Category Deleted Success!"});
        }
    } catch (error) {
            console.log(error);
            res.json({ status: 400, message: "Error!", error: error });
    }
})

router.put('/update', async(req, res)=>{
    try {
        let category = await Category.findOneAndUpdate({_id:req.body.categoryId},{$set:req.body})
        res.json({ status: 200, message: "Category Update Success!", data: category });
    } catch (error) {
            res.json({ status: 400, message: "Error!", error: error });
    }
})

module.exports = router;
