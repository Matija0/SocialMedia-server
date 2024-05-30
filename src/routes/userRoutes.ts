import {Router} from 'express';
import { createUser, getUser, login, updateUser } from '../controllers/userController';
import multer from 'multer';



const router = Router();
const upload = multer({ dest: "uploads/" });

router.post("/users", createUser)
router.get("/users/:id", getUser)
router.post("/login", login)
router.put("/users/:id", upload.single("profilePicture"), updateUser)

export default router;