import mongoose from "mongoose";

const OrderSchema = mongoose.Schema(
  {
    userId: { type: String, required: true },
    products: [
      {
        productId: {
          type: String,
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    amount: {
      type: Number,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "generada",
    },
  },
  { timestamps: true }
);

const OrderModel = mongoose.model("ordenes", OrderSchema);

export default OrderModel;
