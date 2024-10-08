const express = require('express');
const { dbConnection } = require('./database/config');
const cors = require('cors');
require('dotenv').config();

//Crear el servidor de express
const app = express();

//Conexion a Base de Datos
dbConnection();

//CORS
app.use( cors() );

//Directorio Publico
app.use( express.static('public') );

//Lectura y Parseo del body
app.use( express.json() );

//Rutas
app.use('/api/auth', require('./routes/auth') );
app.use('/api/events', require('./routes/events') );


//Escuchar Peticiones
app.listen( process.env.PORT, ()=>{
    console.log(`servidor corriendo en puerto ${process.env.PORT}`);
} )