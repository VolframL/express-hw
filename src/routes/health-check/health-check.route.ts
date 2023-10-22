import { Router } from "express"


const router = Router()

/**
 * @swagger
 * /health-check:
 *   get:
 *     description: Health-check endpoint
 *     tags:
 *      - Health-check
 *     responses:
 *      200:
 *         $ref: '#/components/responses/HealthCheck'
 *      400:
 *         $ref: '#/components/responses/BadRequest'
 *      404:
 *         $ref: '#/components/responses/NotFound'
 *      'default':
 *         $ref: '#/components/responses/default'
 */
router.get('/health-check', (_req, res) => {
  res.json({ message: 'Server is running' })
})

export default router
