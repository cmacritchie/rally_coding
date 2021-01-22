import React, { useEffect, useState} from 'react'
import axios from 'axios';
import { connect } from 'react-redux';



const ArticleForm = ({existingArticle, onSubmit}) => {
    const [article, setArticle] = useState(existingArticle)

    return(
        <form onSubmit={() => onSubmit(article)}>
            <label htmlFor="article-title">Title</label><br />
            <input id="article-title" value={existingArticle.title} onChange={e=>setArticle({...existingArticle, title: e.target.value })}></input><br />
            <label htmlFor="article-content">Content</label><br/>
            <textarea id="article-content" value={existingArticle.content} onChange={e=>setArticle({...existingArticle, content:e.target.value})} /><br />
        </form>
    )
}

ArticleForm.defaultProps = {
    existingArticle: {
        title:'',
        content:''
    }
}

const ArticleWrapper = ({ match, history }) => {

    const [fetchedArticle, setFetchedArticle] = useState({ title:'', content:''})
    
    useEffect(() => {
        const { params } = match

        async function fetchArticle(articleId) {
            const res = await axios.get(`/api/blogposts/${articleId}`)
            setFetchedArticle(res.data);
        }
        if(Object.keys(params).includes('articleid')){
            fetchArticle(params.articleid)
        }
    })

    const submitHandler = (article) => {
        if(article.hasOwnProperty('id')) {
            console.log("patch article ")
        }
        else {
            console.log("creat User")
        }
        // history.push('/')
    }

    return(
        <ArticleForm existingArticle={fetchedArticle} onSubmit={submitHandler} />
    )
}


export default ArticleWrapper