import {  Router } from 'express';
import { createResult, getResult, getResultById, patchResult, deleteResult} from '../controllers/resultController'

const router = Router()
router.post('/api/result', createResult)
router.get('/api/result', getResult)
router.get('/api/result/:id', getResultById)
router.patch('/api/result/:id', patchResult)
router.delete('/api/result/:id', deleteResult)

export default router;