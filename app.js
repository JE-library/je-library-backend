const express = require("express");
const app = express();
const bookRoutes = require("./routes/bookRoutes");
app.use(express.json());
app.use("/", bookRoutes);

app.listen(5000, () => {
  console.log("App running on port 5000");
});
