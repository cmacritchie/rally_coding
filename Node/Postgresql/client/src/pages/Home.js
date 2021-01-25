import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getArticles, deleteArticle} from '../actions/blogActions'
import { NavLink } from 'react-router-dom';
import moment from 'moment'

const Home = () => {
    const dispatch = useDispatch()
    const {user, blog} = useSelector(({blog, user}) => { 
        return { blog, user }
    })

    useEffect(() => {
        if(!blog.loaded) {
            dispatch(getArticles())
        }
    },[blog.loaded])

    if(blog.articles.length === 0) {
        return <h1> No Blog posts. Yet</h1>
    }
    
    if(blog.articles.length > 0) {
        return (
        <div className="blog-posts">
                {blog.articles.map(article => {
                    return (
                        <div key={`article_${article.id}`} className="article">
                            <h3 className="article-title">{article.title}</h3>
                            <div className="article-info">
                                <div>
                                    <span>author: {article.User.name}</span>
                                    &nbsp;
                                    &nbsp;
                                    <span> created: {moment(article.createdAt).format('YYYY-MM-DD')}</span>
                                </div>
                                {(user.isAuthenticated && (article.UserId === user.userInfo.id)) &&
                                <div>
                                    <button><NavLink to={`/post-article/${article.id}`}>Edit</NavLink></button>
                                    <button onClick={()=>dispatch(deleteArticle(article.id))}>DELETE</button>
                                </div>
                                }
                            </div>
                            <br />
                            <p className="article-content">{article.content}</p>
                        </div>
                    )
                })
                }
        </div>
        )
    }

    return <h1>What's going on?</h1>
}

export default Home