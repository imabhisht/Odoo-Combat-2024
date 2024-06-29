import { Request } from 'express';
export interface AuthenticatedRequest extends Request {
    custom_session: {
        "$id": string;
        name: string;
        email: string;
        phone: string;
    };
}