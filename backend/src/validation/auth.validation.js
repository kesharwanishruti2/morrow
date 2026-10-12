import {body,validationResult} from "express-validator"
export const registerValidator = [
    body('email')
        .exists().withMessage("Email is required").bail()
        .trim()
        .isEmail().withMessage("Enter a valid email address"),
    body('name')
        .exists().withMessage("Name is required").bail()
        .isString().withMessage("Name must be a String")
        .trim()
        .isLength({min:2,max:50}).withMessage("Name must be between 2 and 50 characters"),
    body("password")
        .isLength({min:6})
        .withMessage('Password must be at least 6 characters long'),
    body("confirmPassword")
        .custom((confirmPassword, {req})=>{
            return confirmPassword === req.body.password
        })
        .withMessage("Passwords do not match"),
        (req,res,next)=>{
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return res.status(400).json({
                    message:"Invalid Request",
                    errors:errors.array()
                })
            }
            next()
        }
] 
export const loginValidator = [
    body('email')
        .exists().withMessage("Email is required").bail()
        .trim()
        .isEmail().withMessage("Enter a valid email address"),
    body("password")
        .exists().withMessage("Password is required").bail()
        .notEmpty().withMessage("Password cannot be empty"),
    (req,res,next)=>{
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({
                message:"Invalid data",
                errors:errors.array()
            })
        }
        next()
    }
]