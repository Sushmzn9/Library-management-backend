import ReviewSchema from "./ReviewSchema.js";

export const addReview = (obj) => {
  return ReviewSchema(obj).save();
};

//all burrow transaction for admin user only
export const getReview = () => {
  return ReviewSchema.find();
};

// //individual id
// export const getReviewByUserId = (userId) => {
//   return ReviewSchema.find({ userId });
// };

export const updateReview = (_id, data) => {
  return ReviewSchema.findByIdAndUpdate(_id, data);
};

export const deleteReview = (_id, data) => {
  return ReviewSchema.findByIdAndDelete(_id, data);
};
