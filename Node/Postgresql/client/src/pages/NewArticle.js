import React, { useEffect, useState} from 'react'
import axios from 'axios';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { postArticle, editArticle } from '../actions/blogActions'

const mapDispatchToProps = dispatch => bindActionCreators(
    { postArticle },
    dispatch,
)

const ArticleForm = ({existingArticle, onSubmit}) => {
    const [article, setArticle] = useState(existingArticle)

    return(
        <form id="article-form" onSubmit={() => onSubmit(article)}>
            <label htmlFor="article-title">Title</label><br />
            <input id="article-title" value={article.title} onChange={e=>setArticle({...article, title: e.target.value })}></input><br />
            <label htmlFor="article-content">Content</label><br/>
            <textarea id="article-content" value={article.content} onChange={e=>setArticle({...article, content:e.target.value})} /><br />
            <button type="submit" form="article-form" value="Submit">Submit</button>
        </form>
    )
}

ArticleForm.defaultProps = {
    existingArticle: {
        title:'',
        content:''
    }
}

const ArticleWrapper = ({ match, history, postArticle, editArticle }) => {

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
            //need to fix this.
            editArticle(article)
        }
        else {
            console.log("creat Article")
            postArticle(article)
        }
        // history.push('/')
    }

    return(
        <ArticleForm existingArticle={fetchedArticle} onSubmit={submitHandler} />
    )
}


export default connect(null, mapDispatchToProps)(ArticleWrapper)