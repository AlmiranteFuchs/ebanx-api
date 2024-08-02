import { Router } from 'express';
import { balance_controller } from '../controller/balance';
import { event_controller } from '../controller/event';

/**
 * Router Object 
 * This object is responsible for creating the routes
 */

const router: Router = Router();

/**
 * GET method route /balance
 * @param {Request} req
 * @param {Response} res
 * @returns {Response}
 */
router.get('/balance', balance_controller.Balance);

/**
 * POST method route /event
 * @param {Request} req
 * @param {Response} res
 * @returns {Response}
 */
router.post('/event', event_controller.Event);


export { router };