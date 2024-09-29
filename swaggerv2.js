// swagger.js
const swaggerJsDoc = require('swagger-jsdoc');

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Tracks API',
      version: '1.0.0',
      description: 'The API for retrieving track recommendations based on heart rate data.',
    },
    servers: [
      {
            url: 'https://localhost:3000/api/v2',
            description: 'Development server',
      },
      {
        url: 'https://audicinhr.onrender.com/api/v2',
        description: 'Production server',
      },
    ],
  },
  apis: ['./router/trackAdvancedRouter.js'], // Adjust this path to where your API routes are defined
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
module.exports = swaggerDocs;
