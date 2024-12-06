import express, { request, response } from "express";
import pool from "../db/dbConfig.js";




export const manageCategory = (request, response, next) => {

    pool.getConnection((err, con) => {
        if(err) {
            response.send("Some error occured in the mysql connection");
        } else {
            const query = 'select c.c_id as categoryId, c.c_name as categoryName, count(p_id) as productCount from category c left join products p on c.c_id = p.category_id group by c.c_id, c.c_name';

            con.query(query, (err, result) => {
                con.release();
               if(!err){
                return response.render("manage-category.ejs", {categories: result});
                
               } else{
                console.log(err);
               }
            });
        }
    });
 
};


export const addCategory = (request, response, next) => {
    let {categoryName} = request.body;
    pool.getConnection((err, con) => {
        if(err){
            response.send("Some error occured in the mysql connection");
        } else {
            const query = "insert into category (c_name) values (?)";
            con.query(query, categoryName, (err, result) => {
                con.release();
                if(err){
                    response.send("Some error occurred in adding category");
                    console.log(err);
                } else{
                return  response.redirect("/category/manage-category");
                }
            });
        }
    });

}

export const deleteCategory = (request, response, next) => {
    let {categoryId} = request.body;
    console.log("Request received for deleting category with ID:", categoryId);
    pool.getConnection((err, con) => {
        if(err){
            response.send("Some error occured in the mysql connection");
        } else{
            const query = "delete from category where c_id = ?";
            con.query(query, [categoryId], (err, result) => {
                con.release();
              if(err){
                response.send("Some error occurred in delete category");
                console.log(err);
              } else{
                return  response.redirect("/category/manage-category");

              }
            });
        }
    });
}



