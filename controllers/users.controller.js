const { createUser } = require('../queries/users.queries');

// Fonction de validation du mot de passe
function validatePassword(password) {
    const errors = [];
    
    if (password.length < 8) {
        errors.push('Le mot de passe doit contenir au minimum 8 caractères');
    }
    
    if (!/[a-z]/.test(password)) {
        errors.push('Le mot de passe doit contenir au moins une lettre minuscule');
    }
    
    if (!/[A-Z]/.test(password)) {
        errors.push('Le mot de passe doit contenir au moins une lettre majuscule');
    }
    
    if (!/[0-9]/.test(password)) {
        errors.push('Le mot de passe doit contenir au moins un chiffre');
    }
    
    if (!/[^a-zA-Z0-9]/.test(password)) {
        errors.push('Le mot de passe doit contenir au moins un caractère spécial');
    }
    
    return errors;
}

exports.signupForm = (req, res, next) => {
    res.render('users/user-form', {errors: null, isAuthenticated: req.isAuthenticated(), currentUser: req.user});
}

exports.signup = async (req, res, next) => {
    const body = req.body;

    try {
        // Validation du mot de passe
        const passwordErrors = validatePassword(body.password);
        
        if (passwordErrors.length > 0) {
            return res.render('users/user-form', { 
                errors: passwordErrors, 
                isAuthenticated: req.isAuthenticated(), 
                currentUser: req.user
            });
        }

        const user = await createUser(body);
        res.redirect('/');
    } catch(e) {
        res.render('users/user-form', { errors: [ e.message ], isAuthenticated: req.isAuthenticated(), currentUser: req.user});
    }
}
