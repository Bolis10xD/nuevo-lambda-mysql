'use strict';
const pool = require('../connection')

module.exports.RDSupdate =  (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const usuarioId = event.pathParameters.id;
  const body = JSON.parse(event.body);
  const sqlUpdate = {
    USUARIO: body.usuario,
    NOMBRE: body.nombre

  }


  const sql = "UPDATE usuarios SET ? WHERE ID = ? ;"

  pool.getConnection(function(err, connection){
    if(err) throw err;
    connection.query(sql,[sqlUpdate,usuarioId],function(error, results){
      if(error){
        callback ({
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
        callback(null,{
          statusCode:200,
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify({
            success: true,
            message: '¡Exito al actualizar!',
            data: results
          })
        })
        connection.release();
      }
    })
  })
};
