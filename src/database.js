// Importamos rest-mssql-nodejs (previamente instalado) e iniciamos conexión con nuestra BD
const rest = new (require('rest-mssql-nodejs')) ({
    user: 'gerard',
    password: 'sasa',
    server: 'KIPOSANPC\\SQLEXPRESS',
    database: 'ApiTest'
})
 
module.exports = rest // Para que este archivo pueda ser importado