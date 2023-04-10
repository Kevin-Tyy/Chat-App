const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const monogUrl  = process.env.MONGOURL

const connect =  async () => {
    try {
        mongoose.connect(monogUrl)
        
        const db = mongoose.connection;
        db.once('open', ()=>{
            console.log("Connection established");
        })

    } catch (error) {
        console.log(error);
        
    }
}



module.exports = {connect};