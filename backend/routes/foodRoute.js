const express = require("express");
const foodRouter = express.Router();
const multer = require("multer");
// Image Storage Engine
const authMiddleware = require("../middleware/auth");
const { addFood, listFood, removeFood } = require("../controllers/foodController");
const storage= multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`)
    }
})

const upload= multer({storage:storage})

foodRouter.post("/add",upload.single("image"),authMiddleware,addFood);
foodRouter.get("/list",listFood);
foodRouter.post("/remove",authMiddleware,removeFood);

module.exports = foodRouter;

