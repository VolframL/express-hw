/**
 * @swagger
 * 
 * components:
 *  responses:
 * 
 *   Created:
 *    description: Created
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/SuccessMessage'
 *      example:
 *       message: "Created, id: 6533836e919d683ce4eee559"
 * 
 *   Deleted:
 *    description: Deleted
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/SuccessMessage'
 *      example:
 *       message: "Deleted"
 * 
 *   Edited:
 *    description: Edited
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/SuccessMessage'
 *      example:
 *       message: "Edited"
 * 
 *   NotFound:
 *    description: Not found error
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/Error'
 * 
 *   BadRequest:
 *    description: Bad request
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/Error'
 * 
 *   HealthCheck:
 *    description: Health Check
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/SuccessMessage'
 * 
 *   default:
 *    description: Unexpected error
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/Error'
 * 
 *  schemas:
 *   Error:
 *    type: object
 *    properties:
 *     message:
 *      type: string
 *    required:
 *     - message
 * 
 *   Id:
 *    type: string
 *    example: 6533836e919d683ce4eee559
 * 
 *   SuccessMessage:
 *    type: object
 *    properties:
 *     message:
 *      type: string
 *    required:
 *     - message
 * 
 *   Genre:
 *    type: string
 *    example: comedy
 * 
 *   EditGenre:
 *    type: object
 *    properties:
 *     name:
 *      type: string
 *      _id: string
 *    required:
 *     - name
 *     - id
 * 
 *   CreateGenre:
 *    type: object
 *    properties:
 *     name:
 *      type: string
 *    example:
 *     name: comedy
 *    required:
 *     - name
 *     
 *   Movie:
 *    type: object
 *    properties:
 *     _id:
 *      type: string
 *     title:
 *      type: string
 *     description:
 *      type: string
 *     releaseDate:
 *      type: string
 *      format: date
 *     genre:
 *      type: array
 *      items:
 *       type: string
 *    example:
 *     _id: 6533836e919d683ce4eee559
 *     title: Titanic
 *     description: The movie is about the 1912 sinking of the RMS Titanic
 *     releaseDate: 05-April-2012
 *     genre: [historical, romantic drama]
 *    required:
 *     - _id
 *     - title
 *     - description
 *     - genre
 *     - releaseDate
 * 
 *   CreateMovie:
 *    type: object
 *    properties:
 *     title:
 *      type: string
 *     description:
 *      type: string
 *     releaseDate:
 *      type: string
 *      format: date
 *     genre:
 *      type: array
 *      items:
 *       type: string
 *      minItems: 1
 *    example:
 *     title: Men in black
 *     description: A police officer joins a secret organization that polices and monitors extraterrestrial interactions on Earth.
 *     releaseDate: 02-July-1997
 *     genre: [action, adventure, comedy]
 *    required:
 *     - title
 *     - description
 *     - genre
 *     - releaseDate
 * 
 *   EditMovie:
 *    type: object
 *    properties:
 *     title:
 *      type: string
 *     description:
 *      type: string
 *     releaseDate:
 *      type: string
 *      format: date
 *     genre:
 *      type: array
 *      items:
 *       type: string
 *      minItems: 1
 *    example:
 *     genre: [action, adventure, comedy, fantastic]
 */