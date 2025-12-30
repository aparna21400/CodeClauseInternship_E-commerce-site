import express from "express";
import { addToCart, removeFromCart, getCart } from "../controller/cartCon.js";
import auth from "../middleware/auth.js";

const cartRouter = express.Router();

cartRouter.post("/add", authUser, addToCart);
cartRouter.post("/remove", authUser, removeFromCart);
cartRouter.get("/get", authUser, getCart);

export default cartRouter;
