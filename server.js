import dotenv from "dotenv";
dotenv.config();

import express from "express";
const app = express();
const PORT = process.env.PORT || 8000;

app.use("/", (req, res) => {
  res.json({
    status: "success",
    message: "server running healthy",
  });
});
app.listen(PORT, (error) => {
  error
    ? console.log(error.message)
    : console.log(`server running at http://localhost:${PORT}`);
});
