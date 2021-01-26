import axios from 'axios'
import { store } from '../index.js'
// import { history }

export const BlogActionTypes = {
    FETCH_ARTICLES: 'FETCH_ARTICLES',
    POST_ARTICLE: 'POST_ARTICLE',
    DELETE_ARTICLE: 'DELETE_ARTICLE',
    EDIT_ARTICLE: 'EDIT_ARTICLE',
}

export const getArticles = () => async dispatch => {
    const res = await axios.get('/api/blogpost')
    dispatch({
        type: BlogActionTypes.FETCH_ARTICLES,
        payload: res.data
    }) 
}

export const postArticle = (article, history) => async dispatch => {
    try {
        console.log(article)
        debugger
        const user = store.getState().user
        let formData = new FormData()
        for ( var key in article ) {
            formData.append(key, article[key]);
        }
        formData.append('UserId', user.userInfo.id)
        //console.log('article', formData.get())
        
        const res = await axios.post('/api/blogpost', formData)
        console.log(res)
        dispatch({
            type: BlogActionTypes.POST_ARTICLE,
            payload: { ...res.data, User: { name: user.userInfo.name }}
        })
        history.push('/')

    } catch (e) {
        console.log(e)
    }
}

export const deleteArticle = (articleId) => async dispatch => {
   try{
       await axios.delete(`/api/blogpost/${articleId}`)
       dispatch({
           type: BlogActionTypes.DELETE_ARTICLE,
           payload: articleId
       })
   } catch (e) {
    console.log("error", e)
   }
}

export const editArticle = (editArticle, history) => async dispatch => {
    const user = store.getState().user
    const res = await axios.patch(`/api/blogpost/${editArticle.id}`, editArticle)
    console.log("in edit", editArticle )
    debugger
    dispatch({
        type: BlogActionTypes.EDIT_ARTICLE,
        payload: { ...res.data, User: { name: user.userInfo.name }}
    })
    history.push('/')
}
