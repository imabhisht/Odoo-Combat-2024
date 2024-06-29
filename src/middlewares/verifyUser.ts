import { Request, Response, NextFunction } from 'express';

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    // If you need to validate the token, you can add token verification logic here
    // For example, you can use JWT to verify the token:
    // jwt.verify(token, secretKey, (err, decoded) => {
    //     if (err) {
    //         return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    //     }
    //     req.user = decoded;  // Save decoded information to request if needed
    //     next();
    // });

    next();
};
