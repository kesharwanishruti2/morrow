import app from "../src/app/app.js"
import {connectToDB} from "../src/config/db.js"
await connectToDB()
app.listen(3000,()=>{
    console.log("Server is running in port 3000")
})