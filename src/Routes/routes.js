const { Router } = require('express') // Importacion de Router de express para poder especificar las rutas

const router = Router() // Creamos el objeto de tipo Router

router.get('/test', (req, res) => { // Peticion GET cuando el usuario escribe en URL */test
    const data = { // Lo que se mostrara en el navegador al escribir la ruta asignada
        "name": "Gerard",
        "website": "Fitness"
    }
    res.json(data) // Mostramos en formato Json
})

module.exports = router // Para que este archivo pueda ser importado