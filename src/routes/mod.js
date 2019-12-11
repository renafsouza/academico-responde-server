const {
    Mod,User
  } = require('../models');

module.exports.list = async (req, res) => {
    try {
      const mods = await Mod.findAll({
        include: {
          model: User,
        },
      });
      return res.status(200).json(mods);
    } catch (error) {
      return res.status(400).json(error);
    }
  };
module.exports.createMod = async (req,res)=>{
    try{
        data = req.body;
        const user = await User.findOne({
          where: { email:req.params.email },
        });
        let mod;
        if (user) {
            mod = await Mod.create({
              userEmail: user.get("email"),
              ...data,
            });
        }else{
            return res.status(200).json({
                msg: 'User not found',
                created: false,
                data: {mod},
            });
        }
        if(mod)
            return res.status(200).json({
                msg: 'Mod created with success',
                created: true,
                data: mod,
            });
        else
            return res.status(500).json({
                msg: 'Mod not created',
                created: false,
                data: mod,
            });
    }catch(e){
        return res.status(500).json({
            msg: "Error",
            created: false,
            data: e,
        });
    }
}
module.exports.deleteMod = async (req,res)=>{
    try{
        const user = await User.findOne({ where:{email:req.params.email}, attributes: ['email'], include: [{ model: Mod }] });
        if(!user){
            return res.status(505).json({
                msg: "User not found",
                created: false,
                data: {user},
            });
        }
        let removed = await Mod.destroy({
            where:{id:user.Mod.id}
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
module.exports.updateMod = async (req,res)=>{
    try{
        const user = await User.findOne({ where:{email:req.params.email}, attributes: ['email'], include: [{ model: Mod }] });
        if(!user){
            return res.status(505).json({
                msg: "User not found",
                created: false,
                data: {user},
            });
        }
        const update_info = {
        ...req.body,
        };
        let updated = await Mod.update(
            update_info,
            { // where
                where:{id: user.Mod.id}
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