const {request,response} = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const validarJWT = (req=request,resp=response,next)=>{

    //x-token headers
    const token = req.header('x-token');
    
    if(!token){
        console.log("No hay Token en la petición");
        return resp.status(401).json({
            ok:false,
            msg:'Error de Autenticación'
        })
    }

    try {

        const payload = jwt.verify(token,process.env.SECRET_JWT_SEED);
        const {uid,name} = payload;
        req.uid = uid;
        req.name = name;
        
    } catch (error) {
        console.log("Token no valido");
        console.log(error);
        return resp.status(401).json({
            ok:false,
            msg:'Error de Autenticación'
        })
    }

    next();

}

module.exports = {
    validarJWT
}