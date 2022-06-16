const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const handleLogin = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ 'message': 'username and password are required.' });
    }

    const foundUser = await User.findOne({ username: username }).exec();

    if (!foundUser) {
        return res.status(401).json({ 'message': 'username not found! '});
        // return res.sendStatus(401); // unauthorized
    }

    // evaluate password
    const match = await bcrypt.compare(password, foundUser.password);

    if (match) {

        const roles = Object.values(foundUser.roles);

        // create JWT
        const accessToken = jwt.sign(
            { 
                "UserInfo": {
                    "username": foundUser.username,
                    "roles": roles
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '1h' }
        );

        // UserInfo => private jwt claim(s)
        const refreshToken = jwt.sign(
            { "username": foundUser.username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );

        // saving refresh token with current user
        foundUser.refreshToken = refreshToken;
        const result = await foundUser.save();
        console.log(result);

        res.cookie('jwt', refreshToken, {
            httpOnly: true,
            sameSite: 'None',
            secure: true,
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        });

        res.json({ accessToken });

    } else {
        res.sendStatus(401);
    }

}

module.exports = { handleLogin };