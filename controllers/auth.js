const {request,response} = require('express')
const bcrypt = require('bcryptjs')
const Usuario = require('../models/Usuario');
const { generarJWT } = require('../helpers/jwt');

const crearUsuario = async(req=request,resp=response)=>{

    const {email,password} = req.body;
    try {

        let usuario = await Usuario.findOne({email});
        if (usuario){
            return resp.status(400).json({
                ok:false,
                msg:'Ya existe un usuario con ese correo'
            })
        }

        usuario = new Usuario(req.body);
        //Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password,salt);

        await usuario.save();

        //Generar JWT
        const token = await generarJWT(usuario.id,usuario.name);

        resp.status(201).json({
            ok:true,
            uid: usuario.id,
            name:usuario.name,
            token,
        })
    } catch (error) {
        console.log(error);
        resp.status(500).json({
            ok:false,
            msg: 'Por Favor contactar Admin',
        })
    }
}

const loginUsuario = async(req=request,resp=response)=>{

    const {email,password} = req.body;
    try {
        let usuario = await Usuario.findOne({email});
        if (!usuario){
            console.log('Usuario No Existe');
            return resp.status(400).json({
                ok:false,
                msg:'Error en la autenticación'
            })
        }
        //Confirmar password
        const validPassword = bcrypt.compareSync(password,usuario.password);
        if (!validPassword){
            console.log('Password Incorrecto');
            return resp.status(400).json({
                ok:false,
                msg:'Error en la autenticación'
            });
        }

        //Generar JWT
        const token = await generarJWT(usuario.id,usuario.name);

        //Respuesta
        resp.json({
            ok:true,
            uid: usuario.id,
            name:usuario.name,
            token
        });

    } catch (error) {
        console.log(error);
        resp.status(500).json({
            ok:false,
            msg: 'Por Favor contactar Admin',
        })
    }

};

const revalidarToken = async(req=request,resp=response)=>{

    const uid = req.uid;
    const name = req.name;

    //Generar nuevo JWT y retornarlo
    const token = await generarJWT(uid,name);

    resp.json({
        ok:true,
        token
    });
};

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken,
}