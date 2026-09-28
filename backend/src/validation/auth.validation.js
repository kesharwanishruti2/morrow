import {body,validationResult} from "express-validator"
export const registerValidator = [
    body('email')
        .exists().withMessage("Email is required").bail()
        .trim()
        .isEmail().withMessage("Enter a valid email address"),
    body('name')
        .exists().withMessage("name is required").bail()
        .isString().withMessage("Name must be a String")
        .trim()
        .isLength({min:2,max:50}).withMessage("password must be minimum 6 characters"),
    body("password")
        .isLength({min:8})
        .withMessage('Password must be at least 8 character long ')
        .matches(/[A-Z]/)
        .withMessage("Password must contain at least one uppercase letter")
        .matches(/[a-z]/)
        .withMessage("Password must contain at least one lowercase letter")
        .matches(/[0-9]/)
        .withMessage("Password must contain at least one number") ,
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
        .isLength({min:8})
        .withMessage('Password must be at least 8 character long ')
        .matches(/[A-Z]/)
        .withMessage("Password must contain at least one uppercase letter")
        .matches(/[a-z]/)
        .withMessage("Password must contain at least one lowercase letter")
        .matches(/[0-9]/)
        .withMessage("Password must contain at least one number") ,
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