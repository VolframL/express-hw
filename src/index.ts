import bodyParser from 'body-parser'
import express from 'express'
import mongoose from 'mongoose'

import { MONGODB_URL } from './config/keys.ts'
import { routes } from './routes/index.ts'

mongoose.connect(MONGODB_URL).then(() => console.log('mongodb connected')).catch(e => console.log(e))

const app = express()
app.use(bodyParser.json()) // To support JSON-encoded bodies

routes(app)

app.listen(3000)
