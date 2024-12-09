import express from "express";
import { isLoggedIn } from "../middleware/auth.js";
import {manageCategory, addCategory, deleteCategory, updateCategoryAction, updateCategoryPage} from "../controller/category.controller.js";
const router = express.Router();


router.get('/manage-category', isLoggedIn, manageCategory);
router.get('/add-category', isLoggedIn, addCategory);
router.post('/add-category', isLoggedIn, addCategory);
router.post('/delete-category', isLoggedIn, deleteCategory);
router.get('/update-category/:categoryId', isLoggedIn, updateCategoryPage);
router.post('/update-category', isLoggedIn, updateCategoryAction);

export default router;