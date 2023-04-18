'use strict'
const pool = require('./connection')

module.exports.RDSconnection =  (event, context, cb) => {
  context.cbWaitsForEmptyEventLoop = false
  const sql = "SELECT 2+2"

  pool.getConnection( (err, connection) => {
    if(err) throw err
    connection.query(sql,function(error, results){
      if(error){
        cb ({
          statusCode:400,
          headers:{
            'Content-Type':'application/json'
          },
          body: context.fail(JSON.stringify({
            success: false,
            message: error
          }))
        })
      }else{
        cb(null,{
          statusCode:200,
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify({
            success: true,
            message: 'Conexion Exitosa!!!',
            data: results
          })
        })
        connection.release()
      }
    })
  })
}
