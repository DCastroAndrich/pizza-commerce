import mongoose from "mongoose";

const CartSchema = mongoose.Schema(
  {
    products: {
      type: Array,
    },
  },
  { timestamps: true }
);

const CartModel = mongoose.model("carritos", CartSchema);

export default CartModel;
