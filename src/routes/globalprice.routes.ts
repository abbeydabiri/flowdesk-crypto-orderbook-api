import { Router } from 'express';
import { asyncHandler } from '../middleware/asyncHandler';
import { getGlobalPrice } from '../controllers/globalprice.controller';

const router = Router();

router.get('/price/:pair', asyncHandler(getGlobalPrice));

export default router