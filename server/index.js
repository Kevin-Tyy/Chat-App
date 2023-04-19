const express = require('express');
const cors = require('cors');
const db = require('./config/dbconfig')
const User = require('./models/UserModel');
const router = require('./routes/UserRoute');

const dotenv = require('dotenv').config();
const PORT = process.env.PORT
const app = express();

app.use(cors({
    credentials : true,
    origin : ''
}))
app.use(express.json());
app.use(express.urlencoded({extended : true}));

db.connect()
app.use('/api' , router)


app.listen(PORT , ()=>{
    console.log(`server listening on port ${PORT}`);
})

