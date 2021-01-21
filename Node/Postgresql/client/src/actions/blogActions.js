import axios from 'axios'
// import { history }

export const BlogActionTypes = {
    FETCH_ARTICLES: 'FETCH_ARTICLES',
    POST_ARTICLE: 'POST_ARTICLE',
    DELETE_ARTICLE: 'DELETE_ARTICLE',
    EDIT_ARTICLE: 'EDIT_ARTICLE',
}

export const getArticles = () => async dispatch => {
    const res = await axios.get('/api/blogpost')
    console.log(res)
    dispatch({
        type: BlogActionTypes.FETCH_ARTICLES,
        payload: res.data.blogposts
    }) 
}

export const postArticle = (article) => async dispatch => {
    const res = await axios.post('/api/blogpost', article)
    dispatch({
        type: BlogActionTypes.POST_ARTICLE,
        payload: res.data
    })
}

export const deleteArticle = (articleId) => async dispatch => {
    const res = await axios.delete(`/api/blogpost/${articleId}`)
    dispatch({
        type: BlogActionTypes.DELETE_ARTICLE,
        payload: articleId
    })
}

export const editArticle = (editArticle) => async dispatch => {
    const res = await axios.patch(`/api/blogpost/${editArticle.id}`)
    dispatch({
        type: BlogActionTypes.EDIT_ARTICLE,
        payload: res.data
    })
}
