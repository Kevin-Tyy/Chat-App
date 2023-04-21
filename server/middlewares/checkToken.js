const checkToken  = (req, res, next) => {
    const header = req.headers['authorization'];

    if(typeof header !== 'undefined') {
        const bearer = header.split(" ");
        const token  = bearer[1];

        req.token = token
        next()

    }
    else    
    {
        return res.status(403).send({msg : "No token found... So no access granted"})   
        
    }
}
module.exports = checkToken;