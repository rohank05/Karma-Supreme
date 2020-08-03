//requirments
const mysql = require('mysql');

//creating a connection
const con = mysql.createPool({
    host:'',
    port: 3306,
    user:'',
    password:'',
    database:''
})




//exporting it
module.exports = {
    con: con
}