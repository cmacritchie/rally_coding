const cookieCheck  = (req, res, next) => {
    // console.log('userId, sessionUser', req.cookies.user_sid, req.session.user)
    if (req.cookies.user_sid && !req.session.user) {
        res.clearCookie('user_sid');
    }
    next();
}

module.exports = cookieCheck