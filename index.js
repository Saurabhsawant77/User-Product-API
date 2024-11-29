require("dotenv").config();
const path = require("path");
const express = require("express");
const connectMongoDB = require("./config/db");

const PORT = 3030;
const cors = require("cors");

const mainRouter = require("./routes");

const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(express.static(path.resolve("./public")));

//auth route
app.use("/api", mainRouter);

// app.use("/api/products", productRouter);

//connection to MongoDB
connectMongoDB(process.env.MONGODB_URL);

app.get("/", (req, res) => {
  res.send("Testing Route");
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
