import express from "express";
import { ProductController } from "../../controllers/product/product.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

const router = express.Router();

router.get("/", authMiddleware, ProductController.getAllProduct);
router.get("/:page/:limit", ProductController.getProductByCondition);
router.post("/", authMiddleware, ProductController.createProduct);
router.patch("/:id", authMiddleware, ProductController.updateProduct);
router.delete("/:id", authMiddleware, ProductController.deleteProduct);

export default router;
