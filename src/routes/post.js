const {
    Post, User,Question
  } = require('../models');
module.exports.list = async (req, res) => {
      try {
        const user = await User.findOne({ where:{email:req.params.email}, attributes: ['email'], include: [{ model: Post }] });
        return res.status(200).json(user.Posts);
      } catch (error) {
        return res.status(400).json(error);
      }
    };
module.exports.listAll = async (req, res) => {
        try {
          const posts = await Post.findAll({
            include: [{ all: true, nested: true }]
          });
          return res.status(200).json(posts);
        } catch (error) {
          return res.status(400).json(error);
        }
      };
module.exports.createPost = async (req,res)=>{
    try{
        const user = await User.findOne({
          where: { email:req.params.email },
        });
        if(!user)
            return res.status(505).json({
                msg: 'User not found',
                created: false,
                data: {},
            });
        const [post, created]  = await Post.findOrCreate({
            where:{
                id:req.params.id
            },
            defaults:{
                userEmail:req.params.email,
                score:req.body.score
            }
        });
        if(created)
            return res.status(201).json({
                msg: 'Created with sucess',
                created: true,
                data: post,
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
module.exports.deletePost = async (req,res)=>{
    try{
        const user = await User.findOne({ where:{email:req.params.email}, attributes: ['email'], include: [{ model: Post }] });
        if(!user){
            return res.status(505).json({
                msg: "User not found",
                created: false,
                data: {user},
            });
        }
        let removed = await Post.destroy({
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
module.exports.updatePost = async (req,res)=>{
    try{
        const user = await User.findOne({ where:{email:req.params.email}, attributes: ['email'], include: [{ model: Post }] });
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
        let updated = await Post.update(
            update_info,
            { // where
                where:{id: req.params.id}
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