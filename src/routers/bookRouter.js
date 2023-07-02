import express from "express";
import {
  addBook,
  deleteBook,
  getBook,
  updateBook,
} from "../model/book/BookModel.js";
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    console.log(req.body);
    const result = await addBook(req.body);
    result?.id
      ? res.json({
          status: "success",
          message: "New Book Has been added",
        })
      : res.json({
          status: "error",
          message: "Error unable to add new Books",
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
    const books = await getBook();
    res.json({
      status: "success",
      message: "book list",
      books,
    });
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
    });
  }
});

router.put("/", async (req, res) => {
  try {
    const { __v, _id, ...rest } = req.body;
    console.log(req.body);
    const books = await updateBook(_id, rest);

    books?._id
      ? res.json({
          status: "success",
          message: "Book has been updated",
        })
      : res.json({
          status: "error",
          message: "Error unable to update book",
        });
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
    });
  }
});

router.delete("/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    const books = await deleteBook(_id);
    books?._id
      ? res.json({
          status: "success",
          message: "Book has been Deleted",
        })
      : res.json({
          status: "error",
          message: "Error unable to delete book",
        });
  } catch (error) {}
});

export default router;
