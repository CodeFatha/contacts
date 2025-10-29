const swaggerAutogen = require('swagger-autogen')();    

const doc = {
    info: {
        title: 'Contacts API',
        description: 'API documentation for the Contacts application',
        version: '1.0.0',
    },
    host: 'contacts-2nvl.onrender.com/api',
    
    schemes: ['https, http'],
};
const outputFile = './swagger.json';
const endpointsFiles = ['./routes/api/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);