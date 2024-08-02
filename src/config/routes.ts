import { Router } from 'express';

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

router.get('/balance', (req, res) => {
});

router.post('/event', (req, res) => {
});


export { router };