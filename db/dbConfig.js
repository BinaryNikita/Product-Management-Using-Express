import mysql from "mysql2";

const pool = mysql.createPool({
    user:'root',
    password:'root',
    database:'Product_Sales',
    host:'localhost'
});


export default pool;