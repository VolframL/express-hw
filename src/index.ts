import bodyParser from 'body-parser'
import express from 'express'
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

import { routes } from './routes.ts'
import { swaggerDefinition } from './swaggerDefinition.ts'

const PORT = process.env.PORT || 3000

const app = express()
app.use(bodyParser.json()) // To support JSON-encoded bodies

const swaggerSpec = swaggerJSDoc(swaggerDefinition)

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

routes(app)

app.listen(PORT)
