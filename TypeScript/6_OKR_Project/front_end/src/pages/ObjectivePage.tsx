import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { IObjective, ObjectActionTypes } from '../store/objective/objectiveTypes'
import { createObjective, patchObjective } from '../store/objective/objectiveActions'
import ObjectivesInput  from '../components/ObjectivesInput'
import axios from 'axios'


interface ParentProps {
    match: any
    history:any
}

interface DispatchProps {
    createObjective:(user:IObjective) => ObjectActionTypes
    patchObjective:(user:IObjective) => ObjectActionTypes
}

type Props = ParentProps & DispatchProps
   
const mapDispatchToProps = (dispatch: Dispatch<any>) => bindActionCreators<DispatchProps, any>({
    createObjective,
    patchObjective
}, dispatch)

const UserWrapper: React.FC<Props> = ({ match, createObjective, patchObjective, history }) => {

    const [fetchedObjective, setfetchedObjective] = useState<Partial<IObjective> | null>({ owner:match.params.id, objDescription:''})
    

    useEffect(() =>{
        const { params } = match;
        async function fechObjective(obj_id) {
            const res = await axios.get<IObjective>(`/api/objective/${obj_id}`)
            setfetchedObjective(res.data)
        }
        
        if(Object.keys(params).includes('objid')){
            fechObjective(params.objid)
        }
    },[])

    const handleSubmitObjective = (objective: Partial<IObjective>) => {
        //if has _id is existing user, patch user instead of submit
        if(objective.hasOwnProperty('_id')) {
            patchObjective(objective as IObjective)
        }
        else {
            createObjective(objective as IObjective)
        }
        history.push('/')
    }

    return (
        <ObjectivesInput 
            submitObjective={handleSubmitObjective}
            existingObjective={fetchedObjective} />
        )
    
}

export default connect(null, mapDispatchToProps)(UserWrapper)