const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET

const jwtAuth = async ( req, res , next ) => {
    const token = req.cookie.token;
    console.log(`token ${token}`);
        
    if(!token){
        res.status(403).json({
            msg : 'User not logged in'
        });
    }else{
        try {
            const data = await jwt.verify( token , JWT_SECRET);
            console.log(data);

            if(!jwt.verify(token, JWT_SECRET )){
                console.log('token is invalid');
                throw {
                    msg : 'Invalid token'
                }
            }
            else{
                console.log('here after verify jwt');
                const data = jwt.verify(token, JWT_SECRET);
                console.log('data setting with jwt verify :>> ', data);
                next();
            }

        } catch (error) {
            return res.status(500).send(error);   
        }
    }
    
}
module.exports = jwtAuth