import express from "express";

import { getUserByEmail, insertUser } from "../model/user/UserModel.js";
import { hashPassword, comparePassword } from "../../utils/bcrypt.js";
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
      status: "error",
      message: msg,
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    //get the data

    const { email, password } = req.body;
    //check if user exit with received email and get user from db

    const user = await getUserByEmail(email);

    if (user?._id) {
      // use bcrypt to check if the passowrd is matching

      const isMatch = comparePassword(password, user.password);
      if (isMatch) {
        user.password = undefined;
        return res.json({
          status: "success",
          message: "Logedin successfully",
          user,
        });
      }
    }
    res.json({
      status: "error",
      message: "Invalid credentials",
    });
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
    });
  }
});
export default router;
