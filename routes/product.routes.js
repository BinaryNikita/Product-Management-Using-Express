import express from "express";
import {manageProduct, addProduct, deleteProduct} from "../controller/product.controller.js";
const router = express.Router();


router.get('/manage-product', manageProduct);
router.get('/add-product', addProduct);
router.post('/add-product', addProduct);
router.post('/delete-product', deleteProduct);

export default router;