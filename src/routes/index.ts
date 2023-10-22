import { Express } from 'express-serve-static-core'
import genreRoutes from './genres/genres.route.ts'
import healthCheck from './health-check/health-check.route.ts'
import moviesRoutes from './movies/movies.route.ts'
import notFoundRoutes from './not-found/not-found.route.ts'
import swaggerRoute from './swagger/index.ts'

export const routes = (app: Express) => {
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
	})
	app.use(healthCheck)
	app.use(moviesRoutes)
	app.use(genreRoutes)
  app.use(swaggerRoute)
  app.use(notFoundRoutes)
}
