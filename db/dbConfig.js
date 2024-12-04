import mysql from "mysql2";

const pool = mysql.createPool({
    user:'root',
    password:'root',
    database:'Product_Sales',
    host:'localhost'
});

// pool.getConnection((err, con) => {
//     if(err){
//         console.log(err);
//     } else{

//         con.query("select c_id from category where c_name = ?", ["furniture"], (err, result) => {
//                      if(result.length > 0){

//                          console.log(result[0].c_id);
//                      } else{
//                         console.log(err);
//                      }
//         });
         
//     }
// });


export default pool;