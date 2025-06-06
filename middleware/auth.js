import jwt from 'jsonwebtoken';
import config from 'config';

function ensureAuthenticated(req, res, next) {
    // Get token from header
    const token = req.header('x-auth-token');

    // Check of not token
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied.' });
    }

    // Verify token
    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        req.user = decoded.user;
        next();
    } catch (err) {
        return res.status(401).json({ msg: 'Token is invalid.' });
    }

}

export default ensureAuthenticated;