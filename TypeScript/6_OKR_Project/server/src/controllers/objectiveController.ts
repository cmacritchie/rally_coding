import { RequestHandler } from 'express';
import Objective  from '../models/objectiveModel';

export const createObjective: RequestHandler = async (req, res) =>{
    const objective = new Objective({
        ...req.body
    })

    try {
        await objective.save();
        res.status(201).send(objective);
    } catch (e) {
        res.status(400).send(e)
    }
};

export const getObjectives: RequestHandler = async (req, res) => {
    try {
        const objective = await Objective.find({})
        res.send(objective)
    }
    catch(e) {
        res.status(500).send()
    }
}

export const getObjectiveById: RequestHandler = async (req, res) => {
    const _id = req.params.id

    try {
        const objective = await Objective.findById(_id)
        
        if(!objective) {
            return res.status(404).send()
        }
        res.send(objective)
    }
    catch (e) {
        res.status(500).send()
    }
}

export const patchObjective: RequestHandler = async (req, res) => {
    const _id = req.params.id;
    
    try {
        const objective = await Objective.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true})

        if(!objective) {
            return res.status(404).send()
        }
        res.send(objective)
    } catch (e) {
        res.status(400).send(e)
    }
}

export const deleteObjective: RequestHandler = async (req, res) => {
    try {
        const objective = await Objective.findByIdAndDelete(req.params.id)

        if(!objective) {
            res.status(404).send()
        }

        res.send(objective)
    }
    catch (e) {
        res.status(500).send()
    }
}
