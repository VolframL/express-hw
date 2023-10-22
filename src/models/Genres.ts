import mongoose from 'mongoose'
import { IGenre } from '../types/genre.interface.ts'

const { Schema } = mongoose

const genresSchema = new Schema({
	name: { type: String, required: true }
},{
	versionKey: false
})

export const Genres = mongoose.model<IGenre>('Genres', genresSchema)