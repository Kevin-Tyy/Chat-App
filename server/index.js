const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const db = require('./config/dbconfig')
const User = require('./models/UserModel');
const router = require('./routes/UserRoute');
const dotenv = require('dotenv').config();
const PORT = 4000;
const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended : true}));

db.connect()
app.use('/api' , router)
app.use(cookieParser())

app.listen(PORT, ()=>{
    console.log(`Server listening on port ${PORT}`);
});

