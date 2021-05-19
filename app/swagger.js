const swaggerAutogen = require('swagger-autogen')()


const doc = {
    info: {
      version: '',      // by default: '1.0.0'
      title: '',        // by default: 'REST API'
      description: '',  // by default: ''
    },
    host: '',      // by default: 'localhost:3000'
    basePath: '',  // by default: '/'
    schemes: [],   // by default: ['http']
    consumes: [],  // by default: ['application/json']
    produces: [],  // by default: ['application/json']
    tags: [        // by default: empty Array
      {
        name: '',         // Tag name
        description: '',  // Tag description
      },
      // { ... }
    ],
    securityDefinitions: {},  // by default: empty object
    definitions: {},          // by default: empty object
  };

const outputFile = 'swagger_output.json'
const endpointsFiles = ['./routers/SubscribersRouter.ts']
//,'./controller/Subscribers'
swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('./src/index')           // Your project's root file
})
