const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.js");

const app = express();
const PORT = process.env.PORT || 5001;

require("dotenv").config(); // allows us to call env into node app

app.use(cors()); // allows us to do cross-origin request
app.use(express.json()); // allows us to send json payload from frontend to backend
app.use(express.urlencoded());

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use("/auth", authRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
