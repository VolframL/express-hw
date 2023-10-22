import { Request, Router } from 'express'
import { Types } from 'mongoose'
import { Genres } from '../../models/Genres.ts'
import { IGenre } from '../../types/genre.interface.ts'
import { IResponse } from '../../types/response.interface.ts'

const router = Router()

/**
 * @swagger
 * 
 /genre:
 *   get:
 *     summary: Get all genres
 *     description: Returns an array of genres.
 *     tags:
 *      - Genres
 *     responses:
 *      200:
 *         description:  Response of genres list.
 *         content:
 *          application/json:
 *           schema:
 *            type: array
 *            items:
 *             $ref: '#/components/schemas/Genre'
 *      400:
 *         $ref: '#/components/responses/BadRequest'
 *      404:
 *         $ref: '#/components/responses/NotFound'
 *      'default':
 *         $ref: '#/components/responses/default'
 */
router.get('/genre', async (_req, res) => {
	try {
		const genres = await Genres.find()
		if (genres.length === 0) {
			res.status(404).json({ message: 'There are no genres in the catalog' })
		} else {
			res.json(genres)
		}
	} catch (error) {
		res.status(400).json({ message: error.message })
	}
})

/**
 * @swagger
 * /genre:
 *   post:
 *     summary: Create a new genre.
 *     description: Request to create a new genre
 *     tags:
 *      - Genres
 *     requestBody:
 *      description: Request body
 *      required: true
 *      content:
 *       application/json:
 *        schema:
 *         $ref: '#/components/schemas/CreateGenre'
 *     responses:
 *      201:
 *         $ref: '#/components/responses/Created'
 *      400:
 *         $ref: '#/components/responses/BadRequest'
 *      'default':
 *         $ref: '#/components/responses/default'
 */
router.post<string, string, IResponse, IGenre>('/genre', async (req, res) => {
	try {
		const name = req.body.name?.trim()
		const exist = await Genres.findOne({ name })

		if (exist) throw new Error('This category already exists')

		const newGenre = await Genres.create({ name })
		res.status(201).json({ message: `Genre ${newGenre.name} created, id: ${newGenre._id}` })
	} catch (error) {
		res.status(400).json({ message: error.message })
	}
})

/**
 * @swagger
 * /genre/all:
 *   delete:
 *     summary: Delete all genres
 *     description: Delete all genres from DB
 *     tags:
 *      - Genres
 *     responses:
 *      200:
 *         $ref: '#/components/responses/Deleted'
 *      400:
 *         $ref: '#/components/responses/BadRequest'
 *      'default':
 *         $ref: '#/components/responses/default'
 */
router.delete('/genre/all', async (_req, res) => {
	try {
		await Genres.deleteMany({})
		res.status(200).json({ message: 'All genres is deleted' })
	} catch (error) {
		res.status(400).json({ message: error.message })
	}
})

/**
 * @swagger
 * /genre/{id}:
 *   delete:
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *         $ref: '#/components/schemas/Id'
 *        required:
 *         - id
 *     summary: Delete genre by id
 *     description: Delete genre by id from DB
 *     tags:
 *      - Genres
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
router.delete('/genre/:id', async (req: Request<{ id: string }>, res) => {
	try {
		const { id } = req.params
		
		if (!Types.ObjectId.isValid(id)) {
			throw new Error('Not valid ID')
		}
		const movie = await Genres.findByIdAndDelete(id)

		if (movie === null) {
			res.status(404).json({ message: `Genre with id ${id} not found` })
		} else {
			res.status(200).json({ message: `Genre with id: ${id} deleted` })
		}
	} catch (error) {
		res.status(400).json({ message: error.message })
	}
})

/**
 * @swagger
 * /genre/{id}:
 *   patch:
 *     summary: Edit genre if it exists.
 *     description: Request to edit a genre
 *     tags:
 *      - Genres
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
 *         $ref: '#/components/schemas/EditGenre'
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
	'/genre/:id',
	async (req: Request<{ id: string }, IResponse | IGenre, IGenre>, res) => {
		try {
			const { id } = req.params

			if (!Types.ObjectId.isValid(id)) {
				throw new Error('Not valid ID')
			}

			const name = req.body.name?.trim()

			if (!name.length) {
				throw new Error('Not valid name')
			}

			const editedGenre = await Genres.findByIdAndUpdate(id, {name}, {
				new: true
			})
			if (editedGenre === null) {
				res.status(404).json({ message: `Genre with id ${id} not found` })
			} else {
				res.status(200).json({ message: `Genre with id: ${id} edited` })
			}
		} catch (error) {
			res.status(400).json({ message: error.message })
		}
	}
)


export default router
