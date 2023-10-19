export const routes = (app) => {
	/**
	 * @swagger
	 * /:
	 *   get:
	 *     description: Returns a homepage.
	 *     tags:
	 *      - Homepage
	 *     produces:
	 *      - application/json
	 *     responses:
	 *      200:
	 *         description:  Returns a homepage.
	 */
	app.get('/', (_req, res) => {
		res.send('Hello world! =)')
	}),
		/**
		 * @swagger
		 * /health-check:
		 *   get:
		 *     description: Health-check endpoint
		 *     tags:
		 *      - Health-check
		 *     responses:
		 *       200:
		 *         description:  Returns a JSON response indicating the server is running.
		 */
		app.get('/health-check', (_req, res) => {
			res.json({ message: 'Server is running' })
		}),
		/**
		 * @swagger
		 * /auth:
		 *   get:
		 *     description: Authorization GET
		 *     tags:
		 *      - Authorization
		 *     responses:
		 *       401:
		 *         description: Authorization information is missing or invalid.
		 *   post:
		 *     description: If request user === user. Return 200 status and message 'You are authorized'.
		 *                      If the information does not match return 401 status and message 'User not found'
		 *     parameters:
		 *      - in: body
		 *        name: Auth data
		 *        description: Example of auth data.
		 *        schema:
		 *         type: object
		 *         properties:
		 *          username:
		 *           type: string
		 *           example: John
		 *          password:
		 *           type: string
		 *           example: qwerty
		 *     tags:
		 *      - Authorization
		 *     responses:
		 *       200:
		 *         description: Access granted
		 *       401:
		 *         description: Access denied
		 */
		app.get('/auth', (_req, res) => {
			res.status(401).json({ message: 'You are not authorized' })
		}),
		app.post('/auth', (req, res) => {
			const user = {
				username: 'John',
				password: 'qwerty'
			}
			const isUser =
				user.username === req.body.username &&
				user.password === req.body.password

			isUser
				? res.json({ message: 'You are authorized' })
				: res.status(401).json({ message: 'User not found' })
		}),
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
		 *       404:
		 *         description:  Returns 404 status.
		 */
		app.all('*', (_req, res) => {
			res.status(404).send('Page not found')
		})
}
