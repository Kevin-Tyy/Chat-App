const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET

const jwtAuth = ( req, res , next ) => {
    const token = req.cookie.token;
    console.log(token);
        
    if(token){
        try {
            jwt.verify(token, JWT_SECRET)
            console.log('User verified')
            next()

        } catch (error) {
            res.status(400).send('Invalid token')   
        }
        
    }
    else{
        res.status(401).send('Access Denied')
    }
    
}
module.exports = jwtAuth