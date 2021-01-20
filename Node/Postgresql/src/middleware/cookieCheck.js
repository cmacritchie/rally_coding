const cookieCheck  = (req, res, next) => {
    console.log('cookie, check', req.cookies, req.session)
    if (req.cookies.user_sid && !req.session.user) {
        res.clearCookie('user_sid');        
    }
    next();
}

module.exports = cookieCheck