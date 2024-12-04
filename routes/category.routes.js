import express from "express";
import {manageCategory, addCategory, deleteCategory} from "../controller/category.controller.js";
const router = express.Router();


router.get('/manage-category', manageCategory);
router.get('/add-category', addCategory);
router.post('/add-category', addCategory);
router.post('/delete-category', deleteCategory);

export default router;