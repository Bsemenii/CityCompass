const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'CityCompass',
      version: '1.0.0',
      description: 'Just a CityCompass',
    },
    servers: [
      {
        url: 'http://localhost:5000', // Update with your server URL
      },
    ],
  },
  apis: ['server.js'], // Update with the file containing your API routes
};

const specs = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
