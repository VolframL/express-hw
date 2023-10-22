import { Router } from 'express'

const router = Router()

/**
 * @swagger
 * /*:
 *   get:
 *     description: If route not found, return 404 status, and message
 *     tags:
 *      - Not found error 404
 *     produces:
 *      - application/json
 *     responses:
 *      400:
 *         $ref: '#/components/responses/BadRequest'
 *      404:
 *         $ref: '#/components/responses/NotFound'
 *      'default':
 *         $ref: '#/components/responses/default'
 */
router.all('*', (_req, res) => {
	res.status(404).json({ message: 'Page not found' })
})

export default router
