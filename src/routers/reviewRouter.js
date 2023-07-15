import express from "express";
import { auth } from "../Middleware/authMiddleware.js";
import { addReview, getReview } from "../model/Review/ReviewModel.js";
const router = express.Router();

router.post("/", auth, async (req, res) => {
  try {
    console.log(req.body);
    const result = await addReview(req.body);
    if (result?._id) {
      return res.json({
        status: "success",
        message: "Your review has been added",
      });
    }
    res.json({
      status: "error",
      message: "Your review can't be added ",
    });
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const reviews = await getReview();
    res.json({
      status: "success",
      message: "here are the list ",
      reviews,
    });
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
    });
  }
});
export default router;
