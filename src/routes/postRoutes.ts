import { Router } from "express";
import { createPost, deletePost, getPost, getPosts, updatePostComments, updatePostLikes } from "../controllers/postController";
import multer from "multer";

const router = Router();
const upload = multer({ dest: 'uploads/' });

router.post("/posts", upload.single('imageUrl'), createPost);
router.get("/posts", getPosts);
router.get("/posts/:id", getPost);
router.delete("/posts/:id", deletePost);
router.put("/posts/:id/like", updatePostLikes);
router.put("/posts/:id/comment", updatePostComments);

export default router;
