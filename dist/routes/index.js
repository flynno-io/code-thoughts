import { Router } from 'express';
import apiRoutes from './api/index.js';
// Initialize the Express Router middleware
const router = Router();
router.use('/api', apiRoutes);
export default router;
