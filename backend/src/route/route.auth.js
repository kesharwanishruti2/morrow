import {Router} from "express"
import { registerValidator,loginValidator } from "../validation/auth.validation.js"
import { register,login,getMe,refreshTokenC,logout} from "../controller/auth.controller.js"
import { authenticate } from "../middlewar/auth.middlewar.js"

const router = Router()

/**
 * @router .post("/api/auth/register")
 * this registration is only for seller
 *
 */

router.post("/register",registerValidator,register)
router.post("/login",loginValidator,login)
/**
 * yaha authenticate matlab protected route mai 
 * seller kop authentication perform hoga phir app ko kuch mila ga 
 */
router.get("/me",authenticate,getMe)
router.post("/refresh-token",refreshTokenC)
router.post("/logout",authenticate,logout)

export default router