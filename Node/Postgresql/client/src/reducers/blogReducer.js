import { BlogActionTypes } from '../actions/blogActions'


const initialState = {
    articles: []
}

export default function(state = initialState, action) {
    const { type, payload} = action;
    switch(type) {
        case BlogActionTypes.FETCH_ARTICLES:
            return { ...state, articles: payload }
        case BlogActionTypes.POST_ARTICLE:
            return {...state, articles: [payload, ...state.articles]}
        default:
            return state
    }
}