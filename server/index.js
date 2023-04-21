const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const db = require('./config/dbconfig')
const User = require('./models/UserModel');
const router = require('./routes/UserRoute');
const dotenv = require('dotenv').config();
const ws = require('ws');
const PORT = 4000;
const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended : true}));

db.connect()
app.use('/api' , router)

app.use(cookieParser())

const server =  app.listen(PORT)

const websocketserver = new ws.WebSocketServer({server})
websocketserver.on('connection' , (connection, req) =>{
    console.log(req.headers.cookie)
})