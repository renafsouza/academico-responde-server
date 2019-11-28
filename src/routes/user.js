module.exports.createUser = async (req,res)=>{
    user = await User.create(req.query)
    return user;
}
module.exports.deleteUser = async (req,res)=>{
    let removed = await User.destroy({
        where:{email:req.query.email}
    });
    if (removed) {
        return res.status(200).json({
            msg: 'Removed with success',
            created: true,
            data: {},
        });
    }
    return res.status(400).json({
      msg: 'Error on remove',
      created: false,
      data: {},
    });
}