const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "library Management App",
    description: "description",
  },
  host: "je-library-backend-x2gh.onrender.com",
  schemes: ["https"],
};

const outputFile = "./swagger-output.json ";
const routes = ["./app.js"];

swaggerAutogen(outputFile, routes, doc);
