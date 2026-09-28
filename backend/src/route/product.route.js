import {Router} from "express"
import { authenticate } from "../middlewar/auth.middlewar.js"
import { createProduct ,getProdctById,getProduct,update,deleteProduct} from "../controller/product.controller.js"
import { createProductValidator } from "../validation/product.validation.js"


const router = Router()
import multer from "multer"
const upload = multer({storage:multer.memoryStorage(),
     limits: {
        files: 3,
        fileSize: 1 * 1024 * 1024 // 1MB
    },
})
/*
*this is to create a new product
 *@method POST
 * @route /api/products/
 *  @access seller
 * req.body=>{name,description,price:{amount,currency},category,stock]}
*/ 
router.post("/",
    authenticate,
   
   upload.array("images",3),
   (req, res, next) => {
        req.body?.price && (req.body.price = JSON.parse(req.body.price))
        next()
    },

   
     createProductValidator,
       createProduct
)

//witout authenticate user jo bina login ka aya customer 
router.get("/",getProduct)
//ye id se fetched kara ga 
router.get("/:id",getProdctById);
router.put("/:id",authenticate,update)
router.delete("/:id",authenticate,deleteProduct)

export default router