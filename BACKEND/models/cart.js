import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

    cartData: {
      type: Object,
      default: {},
    },
  },
  { timestamps: true }
);

const cartModel = mongoose.models.Cart || mongoose.model("Cart", cartSchema);

export default cartModel;
