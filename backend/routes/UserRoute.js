import express from "express";
import {
    getUsers,
    getUserById, 
    createUser,
    updateUser,
    deleteUser,
    searchUsers
} from "../controllers/UserController.js";

const router = express.Router();

router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.post('/users', createUser);
router.patch('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);
router.get('/users',searchUsers);

export default router;