import { readAccessToken } from "../utils/auth.utils.js";
export function authenticate(req,res,next){
    const accessToken = req.headers.authorization?.split(" ")[1]

    if(!accessToken){
        return res.status(400).json({
            message:"Access Token not found in the request header"
        })
    }
    try{
const decode = readAccessToken(accessToken)
   //const {userId,role}= decode
   //req.user = { userId, role }
   // mainly ye iska aise matlab hota hai 
req.user = decode;
next()

}
    catch(err){
    res.status(401).json({
    message:"Invalid or expired access Token "
    }
)
}
}