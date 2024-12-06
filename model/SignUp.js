import pool from "../db/dbConfig.js";

export default class User{
    constructor(id, name, email, password){
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
    }


    static checkIfEmailExist(email){
        return new Promise((resolve, reject) => {
            pool.getConnection((err, conn) => {
                if(!err){
                    let sql = "select * from user where email = ?";
                    conn.query(sql, [email], (err, result) => {
                        conn.release();

                        if(!err){
                            resolve(result);
                        } else{
                           reject(result);
                        }
                    });

                } else{
                    reject(err);
                }
            });
        });

    }



     saveUser(){
        return new Promise((resolve, reject) => {

            pool.getConnection((err, con) => {

                if(!err){
                let sql2 = "insert into user (u_name, email, paswword) values (? , ? , ?)";
            con.query(sql2, [this.name, this.email, this.password], (err, result) => {
                if(!err){
                   resolve(result);
                } else{
                   reject(err);
                }
                
            });
        } else{
            reject(err);
        }
        });
    });
     
}

}