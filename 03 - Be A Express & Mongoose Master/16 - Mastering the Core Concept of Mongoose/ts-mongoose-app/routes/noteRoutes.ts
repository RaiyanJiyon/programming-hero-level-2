import { getAllUsers, createUser } from "../controllers/noteController.js";
import { Router } from "express";

const router: Router = Router();

router.get('/', getAllUsers);
router.post('/', createUser);

export default router;