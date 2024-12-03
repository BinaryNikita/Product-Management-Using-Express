import express from "express";
import {signInPage, signInAction } from "../controller/admin.controller.js";
import {signUpPage, signUpAction } from "../controller/admin.controller.js";
const router = express.Router();

router.get("/sign-in", signInPage);
router.post("/sign-in", signInAction);
router.get("/sign-up", signUpPage);
router.post("/sign-up", signUpAction);





export default router;