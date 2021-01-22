import React, { useEffect } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { getArticles } from '../actions/blogActions'

const mapDispatchToProps = dispatch => bindActionCreators({ 
    getArticles
  },  dispatch)

const mapStateToProps = ({ blog }) => {
    return {
        blog
    }
}

const Home = ({ getArticles, blog }) => {

    useEffect(() => {
        getArticles()
    },[])

    if(blog.articles.length === 0) {
        return <h1> No Blog posts. Yet</h1>
    }
    
    if(blog.articles.length > 0) {
        return (
        <div className="blog-posts">
                {blog.articles.map(article => {
                    return (
                        <div className="article">
                            <h3 className="article-title">{article.title}</h3>
                            <span> created: {article.createdAt}</span>
                            <br />
                            <span>author: test</span>
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

export default connect(mapStateToProps, mapDispatchToProps)(Home)