import { Router } from "express";
import { createPost, deletePost, getPost, getPosts, savePost } from "../controllers/postController";

const router = Router();

router.post("/posts", createPost);
router.get("/posts", getPosts);
router.get("/posts/:id", getPost);
router.delete("/posts/:id", deletePost);
router.post("/posts/:id/save", savePost);

export default router;
