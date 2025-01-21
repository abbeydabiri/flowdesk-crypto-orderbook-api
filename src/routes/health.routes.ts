import { Router } from 'express';
import { asyncHandler } from '../middleware/asyncHandler';
import { getServiceHealth } from '../controllers/health.controller';

const router = Router();

router.get('/health', asyncHandler(getServiceHealth));

export default router;