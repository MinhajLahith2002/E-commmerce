import express from "express";
import { addToCart, removeFromCart, getCart } from "../controllers/cartController.js";
import authMiddleware from "../middleware/auth.js"

const cartRouter = express.Router();

cartRouter.post("/add", addToCart);
cartRouter.delete("/remove", removeFromCart);
cartRouter.get("/get", getCart);

export default cartRouter; 