import { Router } from 'express';
import { balance_controller } from '../controller/balance';
import { event_controller } from '../controller/event';
import { reset_controller } from '../controller/reset';

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

/**
 * POST method route /reset
 * @param {Request} req
 * @param {Response} res
 * @returns {Response}
 */
router.post('/reset', reset_controller.Reset);


export { router };