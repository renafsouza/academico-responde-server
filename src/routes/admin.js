const {
    Admin,User
  } = require('../models');

module.exports.list = async (req, res) => {
    try {
      const admins = await Admin.findAll({
        include: {
          model: User,
        },
      });
      return res.status(200).json(admins);
    } catch (error) {
      return res.status(400).json(error);
    }
  };
module.exports.createAdmin = async (req,res)=>{
    try{
        data = req.body;
        const user = await User.findOne({
          where: { email:req.params.email },
        });
        let admin;
        if (user) {
            admin = await Admin.create({
              userEmail: user.get("email"),
              ...data,
            });
        }else{
            return res.status(200).json({
                msg: 'User not found',
                created: false,
                data: {admin},
            });
        }
        if(admin)
            return res.status(200).json({
                msg: 'Admin created with success',
                created: true,
                data: admin,
            });
        else
            return res.status(500).json({
                msg: 'Admin not created',
                created: false,
                data: admin,
            });
    }catch(e){
        return res.status(500).json({
            msg: "Error",
            created: false,
            data: e,
        });
    }
}
module.exports.deleteAdmin = async (req,res)=>{
    try{
        const user = await User.findOne({ where:{email:req.params.email}, attributes: ['email'], include: [{ model: Admin }] });
        if(!user){
            return res.status(505).json({
                msg: "User not found",
                created: false,
                data: {user},
            });
        }
        let removed = await Admin.destroy({
            where:{id:user.Admin.id}
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
module.exports.updateAdmin = async (req,res)=>{
    try{
        const user = await User.findOne({ where:{email:req.params.email}, attributes: ['email'], include: [{ model: Admin }] });
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
        let updated = await Admin.update(
            update_info,
            { // where
                where:{id: user.Admin.id}
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