import {Router} from 'express';
import { createUser, getUser, login, updateUser } from '../controllers/userController';



const router = Router();

router.post("/users", createUser)
router.get("/users/:id", getUser, updateUser)
router.post("/login", login)

export default router;