import {Router} from "express"
import { authenticate, authorizeRoles } from "../middlewar/auth.middlewar.js"
import { createProduct ,getProdctById,getProduct,update,deleteProduct} from "../controller/product.controller.js"
import { createProductValidator } from "../validation/product.validation.js"


const router = Router()
import multer from "multer"
const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        files: 3,
        fileSize: 5 * 1024 * 1024 // 5MB
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
    authorizeRoles("seller"),
    (req, res, next) => {
        upload.array("images", 3)(req, res, (err) => {
            if (err instanceof multer.MulterError) {
                if (err.code === "LIMIT_FILE_SIZE") {
                    return res.status(400).json({ message: "Image size cannot exceed 5MB" });
                }
                if (err.code === "LIMIT_FILE_COUNT") {
                    return res.status(400).json({ message: "You can upload a maximum of 3 images" });
                }
                return res.status(400).json({ message: err.message });
            } else if (err) {
                return res.status(400).json({ message: err.message });
            }
            next();
        });
    },
    (req, res, next) => {
        if (req.body?.price && typeof req.body.price === "string") {
            try {
                req.body.price = JSON.parse(req.body.price);
            } catch (e) {
                return res.status(400).json({ message: "Invalid price format" });
            }
        }
        next();
    },
    createProductValidator,
    createProduct
)

//witout authenticate user jo bina login ka aya customer 
router.get("/",getProduct)
//ye id se fetched kara ga 
router.get("/:id",getProdctById);
router.put("/:id",authenticate,authorizeRoles("seller"),update)
router.delete("/:id",authenticate,authorizeRoles("seller"),deleteProduct)

export default router