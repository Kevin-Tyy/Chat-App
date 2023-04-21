const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;


const jwtAuth  = (req, res, next) => {
    const header = req.headers['authorization'];

    if(typeof header !== 'undefined') {
        const bearer = header.split(" ");
        const token  = bearer[1];

        if(!token){
            res.status(403).json({
                msg : 'User not logged in, token not provided'
            });
        }else{
            try{
                const data = jwt.verify(token, jwtSecret);
                if(!data){
                    res.status(401).send({ msg : 'Invalid token'});
                }
                else{
                    res.status(200).send({ msg : 'Token verified'});
                }

            }catch(error){
                return res.status(401).send({error : error, msg : 'Invalid token'});   
            }
        }
        next();

    }
    else    
    {
        return res.status(403).send({msg : "No token found... So no access granted"})   
        
    }
}
module.exports = jwtAuth;