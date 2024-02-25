const jwt = require('jsonwebtoken')
const TOKEN_SECRET= "09f26e402586e2faa8da4c98a35f1b20d6b033c60..."

const fetchUser = (req,res,next) =>{
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({error : "Please authenticate using valid token"})  //statuscode-401 is for access denied
    }

    try {
        const data = jwt.verify(token,TOKEN_SECRET); //Get data only from the signed jsonwebtoken
        req.user = data.user ; 
        next();
    } catch (error) {
        res.status(401).send({error : "Please authenticate using a valid token"});
    }

}

module.exports = fetchUser;