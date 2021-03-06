const {
    Student,User
  } = require('../models');

module.exports.list = async (req, res) => {
    try {
      const students = await Student.findAll({
        include: {
          model: User,
        },
      });
      return res.status(200).json(students);
    } catch (error) {
      return res.status(400).json(error);
    }
  };
module.exports.createStudent = async (req,res)=>{
    try{
        data = req.body;
        const user = await User.findOne({
          where: { email:req.params.email },
        });
        let student;
        if (user) {
            student = await Student.create({
              userEmail: user.get("email"),
              ...data,
            });
        }else{
            return res.status(200).json({
                msg: 'User not found',
                created: false,
                data: {student},
            });
        }
        if(student)
            return res.status(200).json({
                msg: 'Student created with success',
                created: true,
                data: student,
            });
        else
            return res.status(500).json({
                msg: 'Student not created',
                created: false,
                data: student,
            });
    }catch(e){
        return res.status(500).json({
            msg: "Error",
            created: false,
            data: e,
        });
    }
}
module.exports.deleteStudent = async (req,res)=>{
    try{
        const user = await User.findOne({ where:{email:req.params.email}, attributes: ['email'], include: [{ model: Student }] });
        if(!user){
            return res.status(505).json({
                msg: "User not found",
                created: false,
                data: {user},
            });
        }
        let removed = await Student.destroy({
            where:{matricula:user.Student.matricula}
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
module.exports.updateStudent = async (req,res)=>{
    try{
        const user = await User.findOne({ where:{email:req.params.email}, attributes: ['email'], include: [{ model: Student }] });
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
        let updated = await Student.update(
            update_info,
            { // where
                where:{matricula: user.Student.matricula}
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