import jwt from "jsonwebtoken"

export const genarateToken = (res,user, message) =>{
    const token = jwt.sign(
        {userId:user._id},
        process.env.JWT_SECRET_KEY,
        {expiresIn: "7d"})

    return res.status(200)
        .cookie("token",token, {
            httpOnly: true,
            sameSite:"strict",
            maxAge:7 * 24 * 60 * 60 * 100 // 7 days
        }).json({
            success:true,
            message,
            user
        })
}