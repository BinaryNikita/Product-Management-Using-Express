import express, { request, response } from "express";
import pool from "../db/dbConfig.js";
export const signInPage = (request, response, next)=>{
    response.render("sign-in.ejs");
};

export const signInAction = (request, response, next) => {
    let {email, password} = request.body;
    pool.getConnection((err, con)=>{
        if(!err){
          let sql = "select * from user where email = ? and paswword = ?";
          con.query(sql, [email, password], (err, result) => {
            con.release();
            if(!err){
                if(result.affectedRows != 0){
                    return response.render("home.ejs");
                } else{
                    console.log(result.length);
                    return response.end("Sign in failed");
                }
            } else{
                console.log(err);
                return response.end("Something went wrong please wait");
            }
          });
        } else{
              console.log(err);
        }
    });
}


export const signUpPage = (request, response, next) => {
    response.render('sign-up.ejs');
}


export const signUpAction = (request, response, next) => {
    let {name, email, password} = request.body;
    pool.getConnection((err, con) => {
        if(!err){
            let sql = "select * from user where email = ?"
          con.query(sql, [email], (err, result) => {
              if(!err){

                if(result.length === 0){
                    let sql2 = "insert into user (u_name, email, paswword) values (? , ? , ?)";
                    con.query(sql2, [name, email, password], (err, result) => {
                        con.release();
                        if(!err){
                            response.render('home.ejs');
                        } else {
                            response.end("Something went wrong");
                        }
                    })

                } else {
                    console.log(err);
                    response.send("User with this email already exist please try a different email.")
                }
                
              } else {
                 console.log("second last: "+err)
              }
          })
        } else{
            console.log("last: "+err);
        }
    });
}


