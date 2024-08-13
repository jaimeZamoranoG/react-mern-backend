/*
    Rutas de Events
    host + /api/events
*/
const {Router} = require('express');
const {check} = require('express-validator')
const { validarCampos } = require('../middlewares/validar_campos');
const { validarJWT } = require('../middlewares/validar_jwt');
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events');
const { isDate } = require('../helpers/isDate');

//Inicializar
const router = Router();

//Todas pasan por validacion de JWT
router.use(validarJWT);

//Rutas
router.get('/',getEventos);

router.post(
    '/',
    [
        check('title','El Titulo es Obligatorio').not().isEmpty(),
        check('start','Fecha de Inicio es obligatoria').custom( isDate ),
        check('end','Fecha de Inicio es obligatoria').custom( isDate ),
        validarCampos
    ],
    crearEvento
);

router.put(
    '/:id',
    [
        check('title','El Titulo es Obligatorio').not().isEmpty(),
        check('start','Fecha de Inicio es obligatoria').custom( isDate ),
        check('end','Fecha de Inicio es obligatoria').custom( isDate ),
        validarCampos
    ],
    actualizarEvento
);

router.delete('/:id',eliminarEvento);

module.exports = router;