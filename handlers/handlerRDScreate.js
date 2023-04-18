'use strict'
const pool = require('../connection')

module.exports.RDScreate =  (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false 
  let {nombre, usuario} = JSON.parse(event.body)
  const sqlCreate = {
    USUARIO: usuario,
    NOMBRE: nombre
  }

  const headers = {'Content-Type':'application/json'}
  const sql = "INSERT INTO usuarios SET ?  "

  pool.getConnection((err, connection) => {
    if(err) throw err
    connection.query(sql,[sqlCreate,],(error, results) => {
      if(error){
        callback ({
          statusCode:400,
          headers,
          body: context.fail(JSON.stringify({
            success: false,
            message: error
          }))
        })
      }else{
        callback(null,{
          statusCode:200,
          headers,
          body:JSON.stringify({
            success: true,
            message: '¡Exito al insertar!',
            data: results
          })
        })
        connection.release()
      }
    })
  })
}
