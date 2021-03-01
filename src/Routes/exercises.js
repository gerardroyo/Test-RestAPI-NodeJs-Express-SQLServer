const { Router } = require('express') // Importacion de Router de express para poder especificar las rutas
const router = Router() // Creamos el objeto de tipo Router
const exercises = require('../sample.json')

const sqlConnection = require('../database') // Importamos el archivo que hace conexión con la BD

router.get('/', (req, res) => { // Petición GET que mostrara cuando el usuario escriba por URL '/' raíz del directorio
    setTimeout(async () => {
        try { // Por si algun motivo peta
            const result = await sqlConnection.executeQuery('SELECT * FROM dbo.exercises') // Consulta a la BD que mostrara todo el contenido de la tabla "dbo.exercises"
            
            res.json(result.data) // mostramos en el navegador en formato Json lo que nos devuelve la consulta 
        }catch { // Lo que hace si peta
            console.log('An error was ocurred /') // Manda por consola el mensaje de error
        }
        

    })
})

router.get('/:Exercisesid', (req, res) => { // Petición GET que mostrara cuando el usuario escriba por URL '/' y el numero de id al que pertenece 1 row (muestra solo 1 row en especifico)
    setTimeout(async () => {
        try { // Por si algun motivo peta
            const { Exercisesid } = req.params // Guarda en la variable (Exercisesid) el numero que escribe el usuario en la URL despues de la raíz '/'
            const query = `
            SELECT * FROM dbo.exercises WHERE Exercisesid = ${Exercisesid} 
            ` // Consulta que muertra todo lo de la Tabla "dbo.exercises" siempre y cuando la id de este sea la misma que el usuario ha pedido a traves de la URL
            const result = await sqlConnection.executeQuery(query) // Ejecutamos la consulta a la BD

            res.json(result.data[0]) // Mostramos el reultado de la consulta en formato Json
        } catch { // Lo que hace si peta
            console.log('An error was ocurred /:id') // Manda por consola el mensaje de error
        }
    })
})
    
router.post('/', (req, res) => { // Petición POST para guardar la información que el usuario se le pide cuando a traves de la aplicación se haga un llamdo POST al servidor API
    setTimeout(async () => {
        try { // Por si algun motivo peta
            /*console.log(Title, Description, Img, LeftColor, RightColor)
            const query = `
            INSERT INTO dbo.exercises (Title, Description, Img, LeftColor, RightColor)
            VALUES (${Title}, ${Description}, ${Img}, ${LeftColor}, ${RightColor})
            GO
            `
            console.log(query)
            const result = await sqlConnection.executeQuery(query)
            const result = await sqlConnection.executeQuery('INSERT INTO dbo.exercises (Title, Description, Img, LeftColor, RightColor) VALUES (@Title, @Description, @Img, @LeftColor, @RightColor)', [{   
                name: 'Title',
                type: 'varchar',
                value: Title
            }, {
                name: 'Description',
                type: 'varchar',
                value: Description 
            }, {
                name: 'Img',
                type: 'varchar',
                value: Img
            }, {
                name: 'LeftColor',
                type: 'nvarchar',
                value: LeftColor
            }, {
                name: 'RightColor',
                type: 'nvarchar',
                value: RightColor
            }]);*/
            const {Exercisesid, Title, Description, Img, LeftColor, RightColor} = req.body // Recivimos los datos que el usuario nos proporciona
            const result = await sqlConnection.executeStoredProcedure('exercisesAddOrEdit', null, { // Ejecutamos en este caso una "Procedure" ja creada anteriormente para actualizar lo que ya esta creado o para isnertar algo nuevo
                _id: Exercisesid,
                _title: Title,
                _description: Description,
                _img: Img,
                _leftColor: LeftColor,
                _rightColor: RightColor
            })

            /*console.log(result.data)*/
            
            res.json({Status: 'Exercise Saved'}) // Mostramos al usuario que se han guardado los datos que ha proporcionado
        } catch (err){ // Lo que hace si peta
            console.log('An error was ocurred /POST') // Manda por consola el mensaje de error
            console.log(err) // Manda por consola el mensaje de error detallado
        }
    })
})

router.put('/:Exercisesid', (req, res) => {
    setTimeout(async () => {
        try {
            const {Title, Description, Img, LeftColor, RightColor} = req.body
            const {Exercisesid} = req.params
            const result = await sqlConnection.executeStoredProcedure('exercisesAddOrEdit', null, { // Ejecutamos en este caso una "Procedure" ja creada anteriormente para actualizar lo que ya esta creado o para isnertar algo nuevo
                    _id: Exercisesid,
                    _title: Title,
                    _description: Description,
                    _img: Img,
                    _leftColor: LeftColor,
                    _rightColor: RightColor
                })
            res.json({Status: 'Exercise Updated'})
        } catch (err){
            console.log('An error was ocurred /PUT:id') // Manda por consola el mensaje de error
            console.log(err) // Manda por consola el mensaje de error detallado
        }
    })
})

router.delete('/:Exercisesid', (req, res) => {
    setTimeout(async () => {
        try {
            const {Exercisesid} = req.params
            const query = `
            DELETE FROM dbo.exercises WHERE Exercisesid = ${Exercisesid} 
            `

            const result = await sqlConnection.executeQuery(query)
            res.json({Status: 'Exercise Updated'})
        } catch (err){
            console.log('An error was ocurred /DELETE:id') // Manda por consola el mensaje de error
            console.log(err) // Manda por consola el mensaje de error detallado
        }
    })
})

/*router.get('/', (req, res) => {
    mysqlConnection.query('SELECT * FROM exercises', (err, rows, fields) => {
        if(!err) {
            res.json(rows)
        } else {
            console.log(err)
        }
    })
})*/

module.exports = router // Para que este archivo pueda ser importado