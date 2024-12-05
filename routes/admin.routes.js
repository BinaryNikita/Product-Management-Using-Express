import express from "express";
import {signInPage, signInAction, signOutAction } from "../controller/admin.controller.js";
import {signUpPage, signUpAction, homePageAction } from "../controller/admin.controller.js";
import {isLoggedIn} from "../middleware/auth.js"
const router = express.Router();

router.get("/sign-in", signInPage);
router.get("/sign-out", signOutAction);
router.post("/sign-in", signInAction);
router.get('/home', isLoggedIn, homePageAction);
router.get("/sign-up", signUpPage);
router.post("/sign-up", signUpAction);





export default router;