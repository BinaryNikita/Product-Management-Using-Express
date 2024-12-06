import pool from "../db/dbConfig";

export default class Product{

    // return new Promise((resolve, reject) => {

    // })
    
    pool.getConnection((err, con) => {
        if(err) {
            response.send("Some error occured in the mysql connection");
        } else {
            const query = 'select c.c_id as categoryId, c.c_name as categoryName, count(p_id) as productCount from category c left join products p on c.c_id = p.category_id group by c.c_id, c.c_name';

            con.query(query, (err, result) => {
                con.release();}
            
            )}
            }
        }
