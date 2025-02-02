
const authMiddleware = require("../middleware/auth");
const {listOrders, placeOrder, updateStatus, userOrders, verifyOrder} = require("../controllers/orderController");
const express = require("express");
const orderRouter = express.Router();

orderRouter.post("/place",authMiddleware,placeOrder);
orderRouter.post("/verify",verifyOrder);
orderRouter.post("/status",authMiddleware,updateStatus);
orderRouter.post("/userorders",authMiddleware,userOrders);
orderRouter.get("/list",authMiddleware,listOrders);

module.exports = orderRouter;