/*
    Rutas de Auth
    host + /api/auth
*/

const {Router} = require('express');
const {check} = require('express-validator')
const router = Router();
const {crearUsuario,loginUsuario,revalidarToken} = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar_campos');
const { validarJWT } = require('../middlewares/validar_jwt');

router.post(
    '/new',[
        check('name','Nombre es Obligatorio').notEmpty(),
        check('email','Email es Obligatorio').isEmail(),
        check('password','Contraseña es de minimo largo 6').isLength({min:6}),
        validarCampos
    ],
    crearUsuario);

router.post(
    '/',
    [
        check('email','Email es Obligatorio').isEmail(),
        check('password','Contraseña es de minimo largo 6').isLength({min:6}),
        validarCampos
    ],
    loginUsuario);

router.get('/renew',[
    validarJWT
],revalidarToken);


module.exports = router;