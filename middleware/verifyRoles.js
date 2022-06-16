const verifyRoles = (...allowedRoles) => {
    return (req, res, next) => {
        
        // there is no request and no roles
        if (!req?.roles) {
            return res.sendStatus(401);
        }

        const rolesArray = [...allowedRoles];
        console.log(rolesArray);
        console.log(req.roles);

        // check if one of the passed roles is allowed
        // find the first true
        const result = req.roles.map(role => rolesArray.includes(role)).find(val => val === true);

        if (!result) {
            return res.sendStatus(401); // Unauthorized
        }

        next();
    }
}

module.exports = verifyRoles;