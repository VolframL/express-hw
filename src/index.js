import bodyParser from 'body-parser'
import express from 'express'
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

import { routes } from './routes.js'
import { swaggerDefinition } from './swaggerDefinition.js'

const PORT = process.env.PORT || 3000

const app = express()
app.use(bodyParser.json()) // To support JSON-encoded bodies

const options = {
	swaggerDefinition,
	apis: ['./src/routes.js']
}
const swaggerSpec = swaggerJSDoc(options)

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

routes(app)

app.listen(PORT)
