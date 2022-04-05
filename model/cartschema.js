const mongoose = require("mongoose");
const Product = require('../model/productschema')
const Customer = require("../model/customerschema")
const Schema = mongoose.Schema;
let ItemSchema = new Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    productName:{
    type:String
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, "Quantity can not be less then 1."],
    },
    shortDescription:{
      type:String
    },
    longDescription:{
      type:String
    },
    available:{
      type:Boolean
    },
    baseCost: {
      type: Number,
     // required: true,
    },
    categoryName:{
      type:String
    },
    brandName:{
      type:String
    },
    size:{
      type:String,
      uppercase:true,
      enum:['S','M','L','XL','XXL']
  },
    total: {
     type: Number,
      required: true,
   },
  },
  {
    timestamps: true,
  }
);

const CartSchema = new Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
    },
    items: [ItemSchema],
    subTotal: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Cart", CartSchema);