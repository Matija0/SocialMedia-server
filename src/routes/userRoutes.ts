import {Router} from 'express';
import { createUser, followUser, getAllUsers, getUser, login, updateUser } from '../controllers/userController';
import multer from 'multer';



const router = Router();
const upload = multer({ dest: "uploads/" });

router.post("/users", createUser)
router.get("/users", getAllUsers)
router.get("/users/:id", getUser)
router.post("/login", login)
router.put("/users/:id", upload.single("profilePicture"), updateUser)
router.put("/users/:id/follow", followUser)

export default router;