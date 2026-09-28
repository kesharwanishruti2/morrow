import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 50
    },

    description: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 500
    },

    category: {
        type: String,
        required: true
    },

    price: {
        amount: {
            type: Number,
            required: true
        },
        currency: {
            type: String,
            enum: ["INR", "USD", "EUR"],
            default: "INR"
        }
    },

    stock: {
        type: Number,
        required: true,
        min: 0
    },

    images: {
        type: [String],
        validate: {
            validator: images => images.length <= 5,
            message: "A Product can have atmost 5 images"
        }
    },

  
  
}, {
    timestamps: true
});

const productModel = mongoose.model("product", ProductSchema);

export default productModel;