// User Route

import { Router } from 'express';
import {  
    createReport,
    deleteReport,
    getReportById,
    getReports,
    getReportsByUser,
    updateReport

 } from '../controllers/report.controller';
import { authenticateToken } from '../middlewares';

const reportRouter = Router();

reportRouter.post('/', authenticateToken(false), createReport);
reportRouter.get('/', authenticateToken(false), getReports);
reportRouter.get('/user', authenticateToken(true), getReportsByUser);
reportRouter.get('/:id', authenticateToken(false), getReportById);
reportRouter.put('/:id', authenticateToken(true), updateReport);
reportRouter.delete('/:id', authenticateToken(true), deleteReport);



export default reportRouter;