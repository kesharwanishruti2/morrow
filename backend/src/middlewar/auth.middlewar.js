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
        req.user = decode;
        next()
    }
    catch(err){
        res.status(401).json({
            message:"Invalid or expired access Token "
        })
    }
}

export function authorizeRoles(...allowedRoles) {
    return (req, res, next) => {
        if (!req.user || !allowedRoles.includes(req.user.role)) {
            return res.status(403).json({
                message: "Access Denied: Only authorized users can perform this action"
            });
        }
        next();
    };
}