import express, { request, response } from "express";
import pool from "../db/dbConfig.js";
import Admin from "../model/Admin.js";
import User from "../model/SignUp.js";


export const homePageAction = ((request, response, next) => {
    if(request.session.isLoggedIn){
        return response.render('home.ejs', {userEmail: request.session.currentUserEmail});
    } else{
         response.redirect("/admin/sign-in");
    }
});


export const signInPage = (request, response, next)=>{
    response.render("sign-in.ejs");
};

export const signInAction = (request, response, next) => {
    let {email, password} = request.body;

    let admin = new Admin(null, email, password);
    admin.authenticate()
        .then(result => {
           if(result.length != 0){
            request.session.currentUserId = result[0].id;
            request.session.currentUserEmail = result[0].email;
            request.session.isLoggedIn = true;
            response.redirect("/admin/home");
           } else{
            console.log(err);
            response.redirect("/admin/sign-in");
           }
        }).catch(err => {
     console.log(err);
        });
}

export const signOutAction = (request, response) => {
    request.session.destroy((err) => {
         if(err){
            console.log(err);
            return res.redirect('/admin/home'); 
         } else{
            response.redirect("/admin/sign-in")
         }
    });
}

export const signUpPage = (request, response, next) => {
   return response.render('sign-up.ejs');
}


export const signUpAction = (request, response, next) => {
    let {name, email, password} = request.body;
    console.log(name + "  " + email + "  " + password);
    User.checkIfEmailExist(email).then((result) => {
        if(result.length > 0){
          response.render("sign-up.ejs");
        } else{
            const newUser = new User(null, name, email, password);
            newUser.saveUser().then((result) => {
                    response.render("sign-in.ejs");

            }).catch((err) => {
                console.log(err);
            })
        }
    })
}


