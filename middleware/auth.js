// Middleware de autenticación
function isAuthenticated(req, res, next) {
    if (req.session.user) {
        return next();
    }
    req.flash('error', 'Debes iniciar sesión para acceder a esta página');
    res.redirect('/');
}

// Middleware para verificar si el usuario ya está autenticado
function isNotAuthenticated(req, res, next) {
    if (!req.session.user) {
        return next();
    }
    // Si ya está autenticado, redirigir según su tipo de usuario
    const user = req.session.user;
    if (user.tipo_usuario === 'estudiante') {
        res.redirect('/estudiante/dashboard');
    } else if (user.tipo_usuario === 'docente') {
        res.redirect('/docente/dashboard');
    } else if (user.tipo_usuario === 'admin') {
        res.redirect('/admin/dashboard');
    } else {
        res.redirect('/dashboard');
    }
}

// Middleware para verificar tipo de usuario
function checkUserRole(allowedRoles) {
    return (req, res, next) => {
        if (!req.session.user) {
            req.flash('error', 'Debes iniciar sesión para acceder a esta página');
            return res.redirect('/');
        }
        
        // Si allowedRoles es un string, convertirlo a array
        const roles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];
        
        if (!roles.includes(req.session.user.tipo_usuario)) {
            req.flash('error', 'No tienes permisos para acceder a esta página');
            return res.redirect('/');
        }
        
        next();
    };
}

module.exports = {
    isAuthenticated,
    isNotAuthenticated,
    checkUserRole
};
