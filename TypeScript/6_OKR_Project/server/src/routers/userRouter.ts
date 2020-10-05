import {  Router } from 'express';
import { createUser, getUsers, getUserById, patchUser, deleteUser} from '../controllers/userController'

const router = Router()
router.post('/api/user', createUser)
router.get('/api/user', getUsers)
router.get('/api/user/:id', getUserById)
router.patch('/api/user/:id', patchUser)
router.delete('/api/user/:id', deleteUser)

export default router;
