const userModel = require('../Model/User');
const jwt= require('jsonwebtoken');
const bcrypt = require('bcrypt')


const LoginUser = async (req, res) =>{
    try {
        const {email, password} = req.body;
        const foundUser = await userModel.findOne({email: email});
        if(!foundUser) return res.json({message:"user not found", code: 404});
        const match = await bcrypt.compare(password, foundUser.password)
        if(!match) return res.json({message:"password does not match",
            code: 404
        });
        if(match){
            // create jwt
            const accessToken = jwt.sign(
                {
                    "UserInfo":{
                        "username":foundUser.username,
                        "email":foundUser.email
                    }
                }, process.env.SECRET_TOKEN, {expiresIn: '60s'}
            )
            const RefreshToken = jwt.sign(
                {
                    "username": foundUser.username
                }, process.env.REFRESH_TOKEN, {expiresIn: '1d'}
            )

            // saving refresh token with current user
            foundUser.refresh_token = RefreshToken
            await foundUser.save()

            // create a secure cookie with refresh token
            res.cookie('jwt', RefreshToken, {
                httpOnly:true,
                secure:true,
                sameSite:'None',
                maxAge: 24 * 60 * 60 * 1000
            })
            return res.json({
                code:200,
                message: "logged in successfully",
                user:{
                    email: foundUser.email,
                    username: foundUser.username,
                    accessToken
                }
            })
        }else{
            res.sendStatus(401)
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = LoginUser
