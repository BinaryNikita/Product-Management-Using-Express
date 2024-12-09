import express from "express";
import {manageProduct, addProduct, deleteProduct, updateProduct, updateProductAction} from "../controller/product.controller.js";
import { isLoggedIn } from "../middleware/auth.js";
const router = express.Router();


router.get('/manage-product', isLoggedIn, manageProduct);
router.get('/add-product', isLoggedIn, addProduct);
router.post('/add-product', isLoggedIn, addProduct);
router.post('/delete-product', isLoggedIn, deleteProduct);
router.get('/update-product/:productId', isLoggedIn, updateProduct);
router.post('/update-product', isLoggedIn, updateProductAction);

export default router;