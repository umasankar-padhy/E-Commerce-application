const express = require("express");
const router = express.Router();

const { createComment, updateComment, getComment, deleteComment, getCommentCount } = require("../controllers/commentController");
const { requireSignIn } = require("../middleware/authMiddleware");

router.post("/create", requireSignIn, createComment);
router.put("/update/:id", requireSignIn, updateComment);
router.put("/get/:id", requireSignIn, getComment);
router.get("/count/:id", requireSignIn, getCommentCount);
router.delete("/delete/:id", requireSignIn, deleteComment);





module.exports= router; 

 




