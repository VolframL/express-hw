import { Router } from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from 'swagger-ui-express';
import { swaggerDefinition } from "./swaggerDefinition.ts";

const router = Router()
const swaggerSpec = swaggerJSDoc(swaggerDefinition)

router.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

export default router