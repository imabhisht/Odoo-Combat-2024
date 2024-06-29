import { Request, Response, NextFunction } from 'express';
import AppwriteClient from '../auth/appwrite';
import { AuthenticatedRequest } from '../interface';

export const authenticateToken = async(req : any, res: any, next: NextFunction) => {
    try {
        const token = req.headers['authorization'];
    
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized: No token provided' });
        }

        const appwriteClient = new AppwriteClient(token);
        const userInfo = await appwriteClient.account.get()
        console.log(userInfo);
        req.custom_session = userInfo; 
        next();
    } catch (error: any) {
        console.log(error);
        return res.status(401).json({ message: error.message });
    }
    
};
