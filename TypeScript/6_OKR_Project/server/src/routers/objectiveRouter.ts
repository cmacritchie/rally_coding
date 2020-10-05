import {  Router } from 'express';
import { createObjective, getObjectives, getObjectiveById, patchObjective, deleteObjective} from '../controllers/objectiveController'

const router = Router()
router.post('/api/objective', createObjective)
router.get('/api/objective', getObjectives)
router.get('/api/objective/:id', getObjectiveById)
router.patch('/api/objective/:id', patchObjective)
router.delete('/api/objective/:id', deleteObjective)

export default router;
