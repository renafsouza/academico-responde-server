const {
    Professor,User
  } = require('../models');

module.exports.list = async (req, res) => {
    try {
      const professors = await Professor.findAll({
        include: {
          model: User,
        },
      });
      return res.status(200).json(professors);
    } catch (error) {
      return res.status(400).json(error);
    }
  };
module.exports.createProfessor = async (req,res)=>{
    try{
        data = req.body;
        const user = await User.findOne({
          where: { email:req.params.email },
        });
        let professor;
        if (user) {
            professor = await Professor.create({
              userEmail: user.get("email"),
              ...data,
            });
        }else{
            return res.status(200).json({
                msg: 'User not found',
                created: false,
                data: {professor},
            });
        }
        if(professor)
            return res.status(200).json({
                msg: 'Professor created with success',
                created: true,
                data: professor,
            });
        else
            return res.status(500).json({
                msg: 'Professor not created',
                created: false,
                data: professor,
            });
    }catch(e){
        return res.status(500).json({
            msg: "Error",
            created: false,
            data: e,
        });
    }
}
module.exports.deleteProfessor = async (req,res)=>{
    try{
        const user = await User.findOne({ where:{email:req.params.email}, attributes: ['email'], include: [{ model: Professor }] });
        if(!user){
            return res.status(505).json({
                msg: "User not found",
                created: false,
                data: {user},
            });
        }
        let removed = await Professor.destroy({
            where:{matricula:user.Professor.matricula}
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
module.exports.updateProfessor = async (req,res)=>{
    try{
        const user = await User.findOne({ where:{email:req.params.email}, attributes: ['email'], include: [{ model: Professor }] });
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
        let updated = await Professor.update(
            update_info,
            { // where
                where:{matricula: user.Professor.matricula}
            },
        );
        if(updated)
            return res.status(202).json({
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