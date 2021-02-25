
const express = require('express') // Importamos express
const app = express() // Creamos app para trabajar con express
/*const morgan = require('morgan')*/

// Settings
app.set('port', process.env.PORT || 5000) //Seleccionas el puerto que utilizara la API "process.env.PORT" es para que use el puerto del servidor cuando lo subas a la nuve, 5000 es el que usara en localhost
/*app.set('json spaces', 2)*/

// MiddleWares
/*app.use(morgan('dev'))
app.use(express.urlencoded({extended: false}))
app.unsubscribe(express.json())*/
app.use(express.json()) // Para que la API pueda manejar archivos Json

// Routes
/*app.use(require('./Routes/routes.js'))
app.use('/api/exercises', require('./Routes/exercises.js'))*/
app.use(require('./Routes/exercises.js')) // Definimos el archivo donde estaran las rutas de nuestra API
 
// Starting the Server
app.listen(app.get('port'), () => { // Inicia el servicio API con el puerto definido anteriormente
    console.log(`Server on port ${app.set('port')}`) // Escribimos por consola que el servidor arrancó correctamente y en que puerto esta usando
})