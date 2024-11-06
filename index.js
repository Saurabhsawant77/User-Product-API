require("dotenv").config();
const express = require("express");
const connectMongoDB  = require("./config/db");
// const userRouter = require("./routes/userRoute");
// const { productRouter } = require("./routes/productRoute");
const PORT = 3030;
var cors = require("cors");
const router = require("./routes");


const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use("/api", router);


//connection to MongoDB
connectMongoDB(process.env.MONGODB_URL);

app.get("/", (req, res) => {
  res.send("Testing Router");
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
