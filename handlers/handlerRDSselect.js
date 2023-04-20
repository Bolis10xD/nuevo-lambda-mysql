'use strict';
const pool = require('../connection')

module.exports.RDSselect =  (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const usuarioId = event.pathParameters.id;


  const headers = {'Content-Type':'application/json','Access-Control-Allow-Origin': '*','Access-Control-Allow-Credentials': true}
  const sql = "SELECT ID, USUARIO, NOMBRE FROM usuarios WHERE ID = ? ;"

  pool.getConnection(function(err, connection){
    if(err) throw err;
    connection.query(sql,[usuarioId],function(error, results){
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
            message: '¡Exito al consultar!',
            data: results
          })
        })
        connection.release();
      }
    })
  })
};
