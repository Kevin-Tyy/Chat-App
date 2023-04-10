const express = require('express');
const db = require('./config/dbconfig')
const User = require('./models/UserModel');
const router = require('./routes/UserRoute');
const dotenv = require('dotenv').config();
const PORT = process.env.PORT
const app = express();


app.use(express.json());
app.use(express.urlencoded({extended : true}));





db.connect()
app.use('/' , router)


app.listen(PORT , ()=>{
    console.log(`server listening on port ${PORT}`);
})

