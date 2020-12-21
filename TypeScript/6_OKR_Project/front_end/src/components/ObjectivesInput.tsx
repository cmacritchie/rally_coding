import React, { useState, useEffect, FormEvent} from 'react'
import { IObjective } from '../store/objective/objectiveTypes'

interface ParentProps {
    existingObjective: Partial<IObjective> | null
    submitObjective: (objective: IObjective) => void
}

type Props = ParentProps

const ObjectivesInput: React.FC<Props> =({ existingObjective, submitObjective }) => {
    const [objective, setObjective] = useState<Partial<IObjective> | null>(existingObjective)

    useEffect(() => {
        setObjective(existingObjective)
    }, [existingObjective])

    const onHandleSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault()
        submitObjective(objective as IObjective)
    }

    return(
        <div>
            <form onSubmit={onHandleSubmit}>
                <textarea value={objective.objDescription}
                    placeholder="Insert Objectives"
                    name="user placeholder"
                    onChange ={e => setObjective({...objective, objDescription: e.target.value})}
                    required
                    />
                    <br />
                <input type="submit" value="submit" />
            </form>
        </div>
    )
}

export default ObjectivesInput