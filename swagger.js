const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "library Management App",
    description: "description",
  },
  host: "https://je-library-backend.onrender.com",
};

const outputFile = "./swagger-output.json ";
const routes = ["./app.js"];

swaggerAutogen(outputFile, routes, doc);
