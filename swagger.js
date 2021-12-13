const swaggerAutogen = require("swagger-autogen")();

const outputFile = "./swagger_output.json";
const endpointsFiles = ["./src/router/router.ts"];

swaggerAutogen(outputFile, endpointsFiles);
