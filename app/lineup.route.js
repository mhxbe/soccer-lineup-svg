import { Router } from 'express';
import { generateLineup } from './lineup.controller';

const router = Router();

router.get('/lineup', generateLineup);

export default router;
