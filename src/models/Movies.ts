import mongoose from 'mongoose'
import { IMovie } from '../types/movie.interface.ts'

const { Schema } = mongoose

const moviesSchema = new Schema({
	title: { type: String, required: [true, "Title is required"]},
	description: { type: String, required: [true, "Description is required"] },
	releaseDate: { type: Date, required: true},
	genre: { type: [String], validate: (arr: string[]) => {
		if (Array.isArray(arr) && arr.length > 0) {
			return true
		} else {
			throw new Error('Genre must be not empty array of strings')
		}}}
},{
	versionKey: false
})

export const Movies = mongoose.model<IMovie>('Movies', moviesSchema)
