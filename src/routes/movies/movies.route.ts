import { Request, Router } from 'express'
import { Types } from 'mongoose'
import { Movies } from '../../models/Movies.ts'
import { IMovie } from '../../types/movie.interface.ts'
import { IResponse } from '../../types/response.interface.ts'

const router = Router()

/**
 * @swagger
 * 
 /movies:
 *   get:
 *     summary: Get all movies
 *     description: Returns an array of movies.
 *     tags:
 *      - Movies
 *     responses:
 *      200:
 *         description:  Response of movies list.
 *         content:
 *          application/json:
 *           schema:
 *            type: array
 *            items:
 *             $ref: '#/components/schemas/Movie'
 *      400:
 *         $ref: '#/components/responses/BadRequest'
 *      404:
 *         $ref: '#/components/responses/NotFound'
 *      'default':
 *         $ref: '#/components/responses/default'
 */
router.get<string, string, IMovie[] | IResponse>('/movies', async (_req, res) => {
	try {
		const movies = await Movies.find({})
		if (movies.length === 0) {
			res.status(404).json({ message: 'There are no films in the catalog' })
		} else {
			res.json(movies)
		}
	} catch (error) {
		res.status(400).json({ message: error.message })
	}
})

/**
 * @swagger
 * /movies/genre/{genreName}:
 *   get:
 *     summary: Get movie by genre
 *     description: Request to get movie by genre
 *     tags:
 *      - Movies
 *     parameters:
 *      - in: path
 *        name: genreName
 *        schema:
 *         $ref: '#/components/schemas/Genre'
 *        required: true
 *     responses:
 *      200:
 *         description: Response of movie list.
 *         content:
 *          application/json:
 *           schema:
 *            type: array
 *            items:
 *             $ref: '#/components/schemas/Movie'
 *      400:
 *         $ref: '#/components/responses/BadRequest'
 *      404:
 *         $ref: '#/components/responses/NotFound'
 *      'default':
 *         $ref: '#/components/responses/default'
 */
router.get('/movies/genre/:genreName', async (req, res) => {
	try {
		const genre = req.params.genreName
		const movies = await Movies.find({genre})
		if (movies.length === 0) {
			res.status(404).json({ message: `There are no films in the catalog  with genre: ${genre}` })
		} else {
			res.json(movies)
		}
	} catch (error) {
		res.status(400).json({ message: error.message })
	}
})


/**
 * @swagger
 * /movies/{id}:
 *   get:
 *     summary: Get movie by Id
 *     description: Request to get movie by Id
 *     tags:
 *      - Movies
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *         $ref: '#/components/schemas/Id'
 *        required: true
 *     responses:
 *      200:
 *         description:  Response of movie.
 *         content:
 *          application/json:
 *           schema:
 *            $ref: '#/components/schemas/Movie'
 *      400:
 *         $ref: '#/components/responses/BadRequest'
 *      404:
 *         $ref: '#/components/responses/NotFound'
 *      'default':
 *         $ref: '#/components/responses/default'
 */
router.get(
	'/movies/:id',
	async (req: Request<{ id: string }, IResponse | IMovie, IMovie>, res) => {
		try {
			const { id } = req.params

			if (!Types.ObjectId.isValid(id)) {
				throw new Error('Not valid ID')
			}
			const movie = await Movies.findById(id)
			if (movie === null) {
				res.status(404).json({ message: `Movie with id ${id} not found` })
			} else {
				res.status(200).json(movie)
			}
		} catch (error) {
			res.status(400).json({ message: error.message })
		}
	}
)

/**
 * @swagger
 * /movies:
 *   post:
 *     summary: Create a new movie.
 *     description: Request to create a new movie
 *     tags:
 *      - Movies
 *     requestBody:
 *      description: Request body
 *      required: true
 *      content:
 *       application/json:
 *        schema:
 *         $ref: '#/components/schemas/CreateMovie'
 *     responses:
 *      201:
 *         $ref: '#/components/responses/Created'
 *      400:
 *         $ref: '#/components/responses/BadRequest'
 *      'default':
 *         $ref: '#/components/responses/default'
 */
router.post<string, string, IResponse, IMovie>('/movies', async (req, res) => {
	try {
		const newMovie = {
			title: req.body.title?.trim(),
			description: req.body.description?.trim(),
			releaseDate: req.body.releaseDate,
			genre: req.body.genre
		}
		const createdMovie = await Movies.create(newMovie)
		res.status(201).json({ message: `Movie created, id: ${createdMovie._id}` })
	} catch (error) {
		res.status(400).json({ message: error.message })
	}
})

/**
 * @swagger
 * /movies/all:
 *   delete:
 *     summary: Delete all movies
 *     description: Delete all movies from DB
 *     tags:
 *      - Movies
 *     responses:
 *      200:
 *         $ref: '#/components/responses/Deleted'
 *      400:
 *         $ref: '#/components/responses/BadRequest'
 *      'default':
 *         $ref: '#/components/responses/default'
 */
router.delete('/movies/all', async (_req, res) => {
	try {
		await Movies.deleteMany({})
		res.status(200).json({ message: 'All movies deleted' })
	} catch (error) {
		res.status(400).json({ message: error.message })
	}
})

/**
 * @swagger
 * /movies/{id}:
 *   delete:
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *         $ref: '#/components/schemas/Id'
 *        required:
 *         - id
 *     summary: Delete movie by id
 *     description: Delete movie by id from DB
 *     tags:
 *      - Movies
 *     responses:
 *      200:
 *         $ref: '#/components/responses/Deleted'
 *      400:
 *         $ref: '#/components/responses/BadRequest'
 *      404:
 *         $ref: '#/components/responses/NotFound'
 *      'default':
 *         $ref: '#/components/responses/default'
 */
router.delete('/movies/:id', async (req: Request<{ id: string }>, res) => {
	try {
		const { id } = req.params

		if (!Types.ObjectId.isValid(id)) {
			throw new Error('Not valid ID')
		}
		const movie = await Movies.findByIdAndDelete(id)

		if (movie === null) {
			res.status(404).json({ message: `Movie with id ${id} not found` })
		} else {
			res.status(200).json({ message: `Movie with id: ${id} deleted` })
		}
	} catch (error) {
		res.status(400).json({ message: error.message })
	}
})


/**
 * @swagger
 * /movies/{id}:
 *   patch:
 *     summary: Edit movie if it exists.
 *     description: Request to edit a movie
 *     tags:
 *      - Movies
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *         $ref: '#/components/schemas/Id'
 *        required: true
 *     requestBody:
 *      description: Request body
 *      required: true
 *      content:
 *       application/json:
 *        schema:
 *         $ref: '#/components/schemas/EditMovie'
 *     responses:
 *      201:
 *         $ref: '#/components/responses/Edited'
 *      400:
 *         $ref: '#/components/responses/BadRequest'
 *      404:
 *         $ref: '#/components/responses/NotFound'
 *      'default':
 *         $ref: '#/components/responses/default'
 */
router.patch(
	'/movies/:id',
	async (req: Request<{ id: string }, IResponse | IMovie, IMovie>, res) => {
		try {
			const { id } = req.params
			const movie = req.body

			if (!Types.ObjectId.isValid(id)) {
				throw new Error('Not valid ID')
			}
			const editedMovie = await Movies.findByIdAndUpdate(id, movie, {
				new: true
			})
			if (editedMovie === null) {
				res.status(404).json({ message: `Movie with id ${id} not found` })
			} else {
				res.status(200).json({ message: `Movie with id: ${id} edited` })
			}
		} catch (error) {
			res.status(400).json({ message: error.message })
		}
	}
)

export default router
