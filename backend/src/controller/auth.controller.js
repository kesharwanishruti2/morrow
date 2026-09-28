import userModel from "../model/user.model.js";
import bcrypt from "bcryptjs"
import {
  createAccessToken,
  createRefreshToken,
  readRefreshToken
} from "../utils/auth.utils.js";

/**
 * register ka controller hai 
 * req.body object format aya ga 
 * req.email
 * req.password 
 * req.confirmpassword aya ga 
 * req.name
 * or more then this 
 */

export  const  register = async (req,res)=>{
try{
    const {name,email ,password,confirmPassword} = req.body;
if(password!== confirmPassword){
    res.status(400).json({
     message:"Password do not match"
    });
}
  const existUser = await userModel.findOne({ email });
if(existUser){
    return res.status(409).json({
        message:"Email is already exists"
    })
}
const passwordHash = await  bcrypt.hash(password,10)
const user = await userModel.create({
    name,
    email,
    passwordHash,
    role:"seller"
});

const accesstoken = createAccessToken({
    userId:user._id,
    role:user.role
});
const refreshToken = createRefreshToken({
    userId: user._id,
    role: user.role
});
res.cookie("refreshToken", refreshToken, {
    httpOnly: true
});
await userModel.findByIdAndUpdate(user._id,{
    refreshToken
});
res.status(200).json({
    message:"Seller Registered Successfully",
    data:{
        user:{
            id:user._id,
            name:user.name,
            email:user.email,
            roles:user.role
        },
        accesstoken
    }
})

}catch(err){
res.status(500).json({
    message:"Registration failed",
    error:err.message
})
}
};
export const login = async(req,res)=>{
const {email,password} = req.body;
const user = await userModel.findOne({
    email
})
if(!user){
    return res.status(400).json({
        message:"Invalid email or password"
    })
}
const isPasswordValid = await bcrypt.compare(password,user.passwordHash)
if(!isPasswordValid){
    return res.status(400).json({
        message:"Invalid email or password"
    })
}

 const accessToken = createAccessToken({
     userId: user._id,
    role: user.role
    }
  
)

const refreshToken = createRefreshToken({
    userId: user._id,
    role: user.role
    })
await userModel.findOneAndUpdate(
   { email},
   { refreshToken}
);
res.cookie("refreshToken",refreshToken,{
    httpOnly:true
})
res.status(200).json({
        message: "user loggedIn successfully",
        data: {
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
                role:user.role
            },
            accessToken
        }
    
}
)
}
export const getMe = async(req,res)=>{
    //req.user = decoded;
    const {userId,role} = req.user;
    const user = await userModel.findById(userId)
    res.status(200).json({
        message:"user data fetched Successfully",
        data:{
            user:{
                email:user.email,
                name:user.name,
                id:user._id
            }
        }
    })
}
export const refreshTokenC = async(req,res)=>{
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken){
        return res.status(400).json({
            message:"Refresh Token is required"
        })
    }
    try{
        const decoded = readRefreshToken(refreshToken)
        console.log("decode",decoded)
        const {userId,role} = decoded

        const user = await userModel.findById(userId)
        console.log("user",user)
        if (!user) {
         return res.status(401).json({
        message: "User not found"
    });
}    console.log("DB TOKEN:", user.refreshToken)
  console.log("SAME:", refreshToken === user.refreshToken)
      if (refreshToken !== user.refreshToken) {
    await userModel.findByIdAndUpdate(user._id, {
        refreshToken: null
    });

    return res.status(401).json({
        message: "Refresh token mismatch"
    });
}
   
        
        
        const accessToken = createAccessToken({
            userId,role
        })
        const newRefreshToken = createRefreshToken({
            userId,role
        })
         await userModel.findByIdAndUpdate(user._id,{
            refreshToken:newRefreshToken
         })
         res.cookie("refreshToken",newRefreshToken,{
            httpOnly:true
         })

         res.status(200).json({
            message:"Refresh token updated successfully",
            data:{
                user:{
                  email:user.email,
                  name:user.name,
                  id:user._id
                },
                accessToken
            }
         })

    }catch(err){
        return res.status(401).json({
            message:"Invalid refresh Token"
        })
    }
}
export const logout = async (req, res) => {
  try {
    const userId = req.user?.userId || req.body?.userId;
    if (userId) {
      await userModel.findByIdAndUpdate(userId, {
        refreshToken: null,
      });
    }
    res.clearCookie("refreshToken");
    return res.status(200).json({
      message: "Logout Successfully",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Logout failed",
      error: err.message,
    });
  }
};