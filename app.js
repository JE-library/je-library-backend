const express = require("express");
const app = express();
const bookRoutes = require("./routes/bookRoutes");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger-output.json");
const cors = require("cors");

//MIDDLEWARE
app.use(express.json());
app.use(cors());

//ROUTES
app.use("/", bookRoutes);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//start server
app.listen(5000, () => {
  console.log("App running on port 5000");
});
