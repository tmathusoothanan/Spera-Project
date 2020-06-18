const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const auth = require('../middleware/auth');
const { json } = require('express');

router.get('/test', (req,res) => {
    res.send('Hello! it is working');
});

//Registration rout
router.post('/register', async(req,res) => {
    try{
    const {firstName, lastName, email, phone, address, password, passwordCheck} = req.body;

    //validation
    if(!firstName || !lastName || !email || !phone || !address || !password || !passwordCheck){
        return res.status(400).json({msg: 'Not all fields have been entered'});
    }

    if(password.length < 8){
        return res.status(400).json({msg: 'Password needs to be at least 8 chracters long'});
    }

    if(password !== passwordCheck){
        return res.status(400).json({msg: 'Enter the same password twice for verification'});
    }

    //check the availability of the email
    const existingUser = await User.findOne({ email: email });
    if(existingUser){
        return res.status(400).json({msg: 'An account with email already exists.'});
    } 

    //Encrypt the password
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    console.log(passwordHash);

    const newUser = new User({
        firstName, 
        lastName, 
        email, 
        phone, 
        address, 
        password: passwordHash

    });
    // save the user into database
    const savedUser = await newUser.save();
    res.json(savedUser);

}
catch(err){
    res.status(500).json({error: err.message});
}
});

//Login Rout
router.post('/login', async(req,res) => {
    try{
    const {email,password} = req.body;

    //validation
    if(!email || !password){
        return res.status(400).json({msg: 'Not all fields have been entered'});
    }

    //check the mail address
    const user = await User.findOne({email: email});
    if(!user){
        return res.status(400).json({msg: 'There is no account registered with this email account'});
    }

    //check the password
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
        return res.status(400).json({msg: 'Invalied password'});
    }

    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
    res.json({
        token,
        user: {
            id: user._id,
            firstName: user.firstName,
            email: user.email
        }
    });
}
catch(err){
    res.status(500).json({error: err.message});
}

});

router.delete('/delete', auth, async(req,res) => {
    try{
        const deleteUser = await User.findByIdAndDelete(req.user);
        res.json(deleteUser);
    }catch(err){
        res.status(500).json({error: err.message});
    }
});

router.post('/tokenIsValied', async(req,res) => {
    try{
        const token = req.header('x-auth-token');
        if(!token){ return res.json(false); }

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if(!verified){ return res.json(false); }

        const user = await User.findById(verified.id);
        if(!user){ return res.json(false); }

        return res.json(true);
    }catch(err){
        res.status(500).json({error: err.message});
    }
});

router.get('/', auth, async(req,res) => {
    const user = await User.findById(req.user);
    res.json(user);
});



module.exports = router;