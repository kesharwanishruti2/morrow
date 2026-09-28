import express from "express"
import authRoute from "../route/route.auth.js"
import cookieParser from "cookie-parser"
import productRoute from "../route/product.route.js"
const app = express()
app.use(express.json())
app.use(cookieParser())


/*

 # undefine reason of refresh token 
Refresh token undefine ayana ka main reason ye hai ki jab hum cookie parser
 ka maine router ka niche rakha means jo api ka nicha rakhs us ka vaja se problem create  hua 

*/
app.use("/api/auth",authRoute)
app.use("/api/products",productRoute)





export default app