const sessionChecker = (req, res, next) => {
    console.log('session', req.session);
    console.log('cookies', req.cookies);
    if (req.session.user && req.cookies.user_sid) {
        console.log('You are good to go');
        next()
    } else {
        next();
    }    
};

module.exports = sessionChecker;