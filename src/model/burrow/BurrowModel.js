import BurrowSchema from "./BurrowSchema.js";

export const addBurrow = (obj) => {
  return BurrowSchema(obj).save();
};

//all burrow transaction for admin user only
export const getBurrow = () => {
  return BurrowSchema.find();
};

//individual id
export const getBurrowByUserId = () => {
  return BurrowSchema.find({ userId });
};

export const updateBurrow = (_id, data) => {
  return BurrowSchema.findByIdAndUpdate(_id, data);
};

export const deleteBurrow = (_id, data) => {
  return BurrowSchema.findByIdAndDelete(_id, data);
};
