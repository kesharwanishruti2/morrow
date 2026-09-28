import productModel from "../model/product.model.js";
import { uploadFile } from "../service/service.js";
import mongoose from "mongoose";
export const createProduct = async(req,res)=>{
 console.log(req.body)
 console.log(req.files)

const filesUrls = [];

for(let i= 0;i<req.files.length;i++){
    const response = await uploadFile({
            buffer: req.files[ i ].buffer,
            fileName: req.files[ i ].originalname
        })

        filesUrls.push(response.url)
}
console.log(filesUrls)
const  {name,description,category,stock,price} = req.body
const Product = await  productModel.create({
   name,
   description,
   category,
      price: {
        amount: Number(price.amount),
        currency:price.currency
    },
    stock: Number(stock),
   images:filesUrls 
})
  res.status(201).json({
        message: "Product created successfully",
        data: {
            Product
        }
    })
}
export const getProduct = async(req,res)=>{
    try{

    const { category, search } = req.query;
    const filter = {};


    // Category filter
  if (category) {
  filter.category = {
    $regex: `^${category}$`,
    $options: "i",
  };
}

    // Search filter
    if (search) {
      filter.name = {
        $regex: search,
        $options: "i",
      };
    }

    const products = await productModel.find(filter);
    
  
  return res.status(200).json({
    message:"Products feteched successfully",
    data:{
        user:{
            products
        }
    }
  })
    }catch(err){
     return res.status(500).json({
        message:"Internal server error"
     })   
    }
}
export const getProdctById = async(req,res)=>{
try{
const {id} = req.params;
const product = await productModel.findById(id)

if(!product){
    return res.status(404).json({
        message:"Product not found"
    })
}
res.status(200).json({
    message:"product fetched successfully",
    data:{
        product
    }

})
}catch(err){
    return res.status(500).json({
        message:"Failed to fetched Product "
    })
}
}
export const update = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({
                message: "Invalid product Id"
            });
        }

        const Product = await productModel.findById(id);

        console.log("PRODUCT:", Product);

        if (!Product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        const updateProduct = await productModel.findByIdAndUpdate(
            id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        return res.status(200).json({
            message: "Product updated successfully",
            data: {
                product: updateProduct
            }
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Failed to update product",
            error: error.message
        });
    }
};
export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        console.log("DELETE ID:", id);
        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({
                message: "Invalid product Id"
            });
        }

        const Product = await productModel.findById(id);

        console.log("PRODUCT:", Product);

        if (!Product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

          await productModel.findByIdAndDelete(id);


        return res.status(200).json({
            message: "Product delete successfully",
            
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Failed to delete product",
            error: error.message
        });
    }
};