const swaggerAutogen = require('swagger-autogen')();    

const doc = {
    info: {
        title: 'Contacts API',
        description: 'API documentation for the Contacts application',
        version: '1.0.0',
    },
    host: 'localhost:3000',
    schemes: ['http'],
};
const outputFile = './swagger.json';
const endpointsFiles = ['./routes/api/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);