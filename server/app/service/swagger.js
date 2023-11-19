import pkg from 'express'
const { Express, Request, Response } = pkg;
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUI from 'swagger-ui-express'

const options = {
    definition:{
        openapi: "3.0.0",
        info:{
            title: "REST API Docs",
            version: "1.0.0"
        },
        components:{
            securitySchemas:{
                bearerAuth:{
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            }
        ]
    },
    apis: ['./app/REST/user.endpoints.js'],
};

const swaggerSpec = swaggerJsdoc(options)

function swaggerDocs(app, port) {
    app.use('docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec))

    app.get('docs.json', (req, res) => {
        res.setHeader('Content-Type', 'appplication/json')
        res.send(swaggerSpec);
    })
}

export default swaggerDocs;