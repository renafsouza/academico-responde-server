const {
    User, Student, Moderator, Professor, Admin
  } = require('../models');
  module.exports.list = async (req, res) => {
    try {
        const users = await User.findAll({
            include: {
            model: User,
            },
        });
        return res.status(200).json(users);
    } catch (error) {
        return res.status(400).json(error);
    }
};
module.exports.getUser = async (req, res) => {
    try {
        const user = await User.findOne({ 
            where:{email:req.params.email,password:req.body.password}, 
            include: [
                { model: Student },
                { model: Admin },
                { model: Professor },
                { model: Moderator }
            ] 
        });
        if(user)
            return res.status(200).json({
                created:true,
                data:user
            });
            return res.status(400).json({
                created:false,
                data:user
            });
    } catch (error) {
        return res.status(500).json({
            created:false,
            data:error
        });
    }
};
module.exports.createUser = async (req,res)=>{
    try{
        const [user, created] = await User.findOrCreate({
          where: { email: req.params.email },
          defaults: {
              ...req.body,
          },
        });
        if(created)
            return res.status(200).json({
                msg: 'Created with sucess',
                created: true,
                data: user,
            });
        else
            return res.status(504).json({
            msg: 'Error on remove',
            created: false,
            data: {},
            });
    }catch(e){
        return res.status(500).json({
            msg: "Error",
            created: false,
            data: e,
        });
    }
}
module.exports.deleteUser = async (req,res)=>{
    try{
        let removed = await User.destroy({
            where:{email:req.params.email}
        });
        if (!removed) {
            return res.status(200).json({
                msg: 'Removed with success',
                created: true,
                data: {removed},
            });
        }
        return res.status(504).json({
        msg: 'Error on remove',
        created: false,
        data: {removed},
        });
    }catch(e){
        return res.status(500).json({
            msg: "Error",
            created: false,
            data: {e},
        });
    }
}
module.exports.updateUser = async (req,res)=>{
    try{
        const update_info = {
        ...req.body,
        };
        let updated = await User.update(
            update_info,
            { // where
                where:{email: req.params.email}
            },
        );
        if(updated)
            return res.status(403).json({
                msg: 'Updated with success',
                created: true,
                data: updated,
            });
        else 
            return res.status(504).json({
                msg: 'Invalid fields to update',
                created: false,
                data: {updated},
            });
    }catch(e){
        return res.status(500).json({
            msg: "Error",
            created: false,
            data: {e},
        });
    }
}