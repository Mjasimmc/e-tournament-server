import jwt from 'jsonwebtoken';
let count = 0
export const JwtConfig = (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token || !token.startsWith('Bearer ')) {
            return res.status(401).send({ message: 'No token provided' });
        }
        const tokenValue = token.split(' ')[1];
        jwt.verify(tokenValue, 'secret', (err, decoded) => {
            if (err) {
                return res.status(403).send({ message: 'Failed to authenticate token' });
            }
            req.user = decoded;
            console.log(count++)
            next();
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: 'Internal server error' });
    }
};



export const createJwtToken = async(data) => {
    return jwt.sign(data, 'secret', { expiresIn: '7d' });
};
