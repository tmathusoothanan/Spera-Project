const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.port || 5000;
app.listen(port, () => {console.log(`Server has started on the port: ${port}`)});


mongoose.connect(
    process.env.MONGODB_CONNECTION_STRING, 
    {
        useNewUrlParser : true,
        useUnifiedTopology : true,
        useCreateIndex: true
    },
    (err) => {
        if(err){ throw err;}
        console.log('MongoDb connection established');
    }
    

);


app.use('/users', require('./routes/userRouter'));
app.use('/products', require('./routes/productRouter'));