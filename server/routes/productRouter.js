const router = require('express').Router();
const Product = require('../models/productsModel');
const { json } = require('express');

//Insert Products
router.post('/', async(req,res) => {
    try{
        const { name, description, quantity, user_id } = req.body;

        if(!name || !description || !quantity || !user_id){
            return res.status(400).json({msg: 'Not all fields have been entered'});
        }

        const newProduct = new Product({
            name,
            description,
            quantity,
            user_id
        });

    const savedProduct = await newProduct.save();
    res.json(savedProduct);

    }catch(err){
        res.status(500).json({error: err.message});
    }

});

router.get('/', async(req,res) => {
    const product = await Product.find(req.product);
    res.json(product);
});

router.get('/:_id', async(req,res) => {
    const product = await Product.findById(req.params._id);
    res.json(product);
});

router.delete('/:_id', async(req,res) => {
    try{
        const deleteProduct = await Product.findByIdAndDelete(req.params._id);
        res.json(deleteProduct);
    }catch(err){
        res.status(500).json({error: err.message});
    }
});

module.exports = router;
