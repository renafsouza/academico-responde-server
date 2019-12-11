const {
    Question, User, Post, Reply
  } = require('../models');
module.exports.listAll = async (req, res) => {
      try {
        const user = await Post.findAll({ include: [{ model: Question }] });
        return res.status(200).json(user.Questions);
      } catch (error) {
        return res.status(400).json(error);
      }
};
module.exports.list = async (req, res) => {
      try {
        const user = await Post.findOne({ where:{userEmail:req.params.email,id:req.params.postid}, include: [{ model: Question }] });
        return res.status(200).json(user.Post.Questions);
      } catch (error) {
        return res.status(400).json(error);
      }
};
module.exports.createQuestion = async (req,res)=>{
    try{
        const post = await Post.findOne({
          where: { userEmail:req.params.email,id:req.body.id },
        });
        if(!post)
            return res.status(505).json({
                msg: 'Post not found',
                created: false,
                data: {post},
            });
        const [question, created]  = await Question.findOrCreate({
            where:{
                id:req.params.id
            },
            defaults:{
                postId:req.body.id,
                desc:req.body.desc,
                title:req.body.title
            }
        });
        if(created)
            return res.status(201).json({
                msg: 'Created with sucess',
                created: true,
                data: question,
            });
        else
            return res.status(504).json({
                msg: 'Error on create',
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
module.exports.deleteQuestion = async (req,res)=>{
    try{
        console.log("aaaaaaaaaaaaaaaa")
        const post = await Question.findOne({
          where: { id:req.params.id },
        });
        if(!post){
            return res.status(505).json({
                msg: "Post not found",
                created: false,
                data: {post},
            });
        }
        let removed = await Question.destroy({
            where:{id:req.params.id}
        });
        if (removed) {
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
// TODO: fazer
module.exports.updateQuestion = async (req,res)=>{
    try{
        const user = await Post.findOne({ where:{userEmail:req.params.email},include: [{ model: Question }] });
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
        let updated = await Question.update(
            update_info,
            { // where
                where:{postId: req.params.id}
            },
        );
        if(updated)
            return res.status(201).json({
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