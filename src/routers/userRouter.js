import express from "express";

import { insertUser } from "../model/user/UserModel.js";
import { hashPassword } from "../../utils/bcrypt.js";
const router = express.Router();

router.get("/", (req, res) => {
  try {
    res.json({
      statu: "success",
      message: "Here are the user informations",
    });
  } catch (error) {
    res.json({
      statu: "error",
      message: error.message,
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const { password } = req.body;

    console.log(req.body, "111");
    req.body.password = hashPassword(password);
    console.log(req.body, "kjhgf");

    const user = await insertUser(req.body);
    user?._id
      ? res.json({
          status: "success",
          message: "New user has been created successfull",
        })
      : res.json({
          status: "error",
          message: "Unable to craete user, try again later",
        });
  } catch (error) {
    let msg = error.message;

    if (msg.includes("E11000 duplicate key error")) {
      msg = "Ther is another user who uses this email in the system";
    }
    res.json({
      statu: "error",
      message: msg,
    });
  }
});

export default router;
