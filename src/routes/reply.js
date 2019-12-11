const {
    Reply, User, Post, Question
  } = require('../models');
module.exports.list = async (req, res) => {
      try {
        const post = await Post.findOne({ attributes: ['user_email',"id"],include: [{ model: Question,include:{model:Reply}, where:{id:req.params.postid }}] });
        if(post)
            return res.status(200).json(post);
        else return res.status(200).json();
      } catch (error) {
        return res.status(400).json(error);
      }
};
module.exports.createReply = async (req,res)=>{
    try{
        const replyPost = await Post.findOne({
          where: {id:req.body.postId },
        });
        const post = await Post.findOne({
          where: { id:req.params.postid },
          include:{model:Question}
        });
        if(!post || !replyPost)
            return res.status(404).json({
                msg: 'Post not found',
                created: false,
                data: {post},
            });
        const [reply, created]  = await Reply.findOrCreate({
            where:{
                id:req.params.id
            },
            defaults:{
                questionId:post.Question.id,
                ...req.body
            }
        });
        if(created)
            return res.status(201).json({
                msg: 'Created with sucess',
                created: true,
                data: reply,
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
module.exports.deleteReply = async (req,res)=>{
    try{
        let removed = await Reply.destroy({
            where:{post_id:req.params.id}
        });
        console.log(removed)
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
module.exports.updateReply = async (req,res)=>{
    try{
        const update_info = {
        ...req.body,
        };
        let updated = await Reply.update(
            update_info,
            { // where
                where:{id: req.params.id}
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