const mysql = require('mysql')

const configDB = {
    connectionLimit: 10,
    host: 'rds-test.ct3dovxeauuu.us-east-1.rds.amazonaws.com',
    user: 'admin',
    password: 'password',
    port: '3306',
    database: 'RDSTest',
    debug: true
}

var  pool = mysql.createPool(configDB)


module.exports = pool