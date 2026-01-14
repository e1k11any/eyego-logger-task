import { Router } from 'express';
import { LogController } from '../controllers/LogController';
import { body } from 'express-validator';
import { validatorMiddleware } from '../middlewares/ValidatorMiddleware';

const router = Router();
const controller = new LogController();

router.post(
  '/logs',
  [
    body('userId').isString().withMessage('userId must be a string').notEmpty(),
    body('action').isString().withMessage('action is required').notEmpty(), // <--- This stops the crash!
    // metadata is optional, so we don't need to force it
  ],
  validatorMiddleware,
  controller.ingest
);

router.get('/logs', controller.read);

export default router;
