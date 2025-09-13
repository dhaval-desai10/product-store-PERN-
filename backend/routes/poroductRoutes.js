import express from "express";
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from "../controllers/product.Controller.js";

const router = express.Router();

router.get("/",getProducts);
router.get("/:id",getProduct);
router.post("/",createProduct);
router.put("/",updateProduct);
router.delete("/:id",deleteProduct);


export default router;