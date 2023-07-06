const User = require('../models/User')

exports.getUsers = async (req, res) => {
    const user = await User.find()
    if(!user) {
        return res.sendStatus(404).json({msg:"no user found"})
    } else{
        return res.json({
            code : 200,
            msg: "success",
            user
        })
    }
}

exports.getSingleUser = async (req, res) => {
    const user = await User.findById(req.params.id)
    if(!user) return res.sendStatus(404).json({msg:"no user found"})
    return res.json({
        code :200,
        msg: "success",
        user
    })
}

exports.deleteUser = async (req, res) =>{
    const user = await User.findOne({_id:req.params.id})
    if(!user) return res.sendStatus(404).json({msg:"user not found"})

    await User.findOneAndDelete({_id:req.params.id})
    return res.json({
        code: 200,
        msg:"user deleted successfully",
        user
    })
}
