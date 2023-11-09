import swaggerJSDoc from 'swagger-jsdoc'

export const swaggerDefinition: swaggerJSDoc.Options = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'ExpressJS EPAM Learning API',
			version: '1.0.0',
			description: 'A sample API'
		},
	},
	apis: ['./src/routes.ts']
}
