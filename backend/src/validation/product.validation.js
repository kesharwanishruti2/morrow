import { body, validationResult } from "express-validator";

export const createProductValidator = [
    body("name")
        .exists().withMessage("Product name is required").bail()
        .isString().withMessage("Product name must be a string").bail()
        .trim()
        .isLength({ min: 2, max: 100 }).withMessage("Product name must be between 2 to 100 characters"),
    body("description")
        .exists().withMessage("Description is required").bail()
        .isString().withMessage("Description must be a string").bail()
        .trim()
        .isLength({ min: 5, max: 1000 }).withMessage("Description length must be between 5 to 1000 characters"),
    body("price.amount")
        .exists().withMessage("Price amount is required").bail()
        .isFloat({ min: 0 }).withMessage("Price amount must be a number greater than or equal to 0"),
    body("price.currency")
        .exists().withMessage("Currency is required").bail()
        .isString().withMessage("Currency must be a string value")
        .isIn(["INR", "USD", "EUR"]).withMessage("Currency must be INR, USD, or EUR"),
    body("category")
        .exists().withMessage("Category is required").bail()
        .trim()
        .notEmpty().withMessage("Category cannot be empty"),
    body("stock")
        .exists().withMessage("Stock is required").bail()
        .notEmpty().withMessage("Stock cannot be empty")
        .isInt({ min: 0 }).withMessage("Stock must be an integer value greater than or equal to 0"),
    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: errors.array()[0].msg,
                errors: errors.array()
            });
        }

        next();
    }
];