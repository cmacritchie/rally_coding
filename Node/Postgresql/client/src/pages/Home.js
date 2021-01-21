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
        console.log(blog.articles)
        return <h1> We got some blog posts here</h1>
    }

    return <h1>What's going on?</h1>
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)