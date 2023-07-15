import BookSchema from "./BookSchema.js";

export const addBook = (obj) => {
  return BookSchema(obj).save();
};
export const getBook = () => {
  return BookSchema.find();
};

export const updateBook = (_id, data) => {
  return BookSchema.findByIdAndUpdate(_id, data,);
};

export const deleteBook = (_id, data) => {
  return BookSchema.findByIdAndDelete(_id, data);
};
