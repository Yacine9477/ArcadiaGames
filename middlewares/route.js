exports.ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated && req.isAuthenticated()) {
        return next();
    }
    res.redirect('/auth/signin/form');
};

// appeler req.isAuthenticated au cas où il est undefined appelé la méthode provoquerai une erreur