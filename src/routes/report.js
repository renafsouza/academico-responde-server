const {
    Report,Post
  } = require('../models');

module.exports.listAll = async (req, res) => {
    try {
      const reports = await Report.findAll();
      return res.status(200).json(reports);
    } catch (error) {
      return res.status(400).json(error);
    }
};
module.exports.list = async (req, res) => {
    try {
        const reports = await Report.findAll({
            where:{
                postId:req.params.postid,
                userEmail:req.params.email
            }
        });
        return res.status(200).json(reports);
    } catch (error) {
        return res.status(400).json(error);
    }
};
module.exports.createReport = async (req,res)=>{
    try{
        data = req.body;
        const post = await Post.findOne({
            where: { 
                id:req.body.postId,
                userEmail:req.params.email
            },
        });
        console.log("awdadwad")
        let report;
        if (post) {
            report = await Report.create({
                id: req.params.id,
                postId: post.get("id"),
                userEmail:req.params.email,
                ...data,
            });
        }else{
            return res.status(200).json({
                msg: 'Post not found',
                created: false,
                data: {report},
            });
        }
        if(report)
            return res.status(200).json({
                msg: 'Report created with success',
                created: true,
                data: report,
            });
        else
            return res.status(500).json({
                msg: 'Report not created',
                created: false,
                data: report,
            });
    }catch(e){
        return res.status(500).json({
            msg: "Error",
            created: false,
            data: e,
        });
    }
}
// TODO
module.exports.deleteReport = async (req,res)=>{
    try{
        const post = await Post.findOne({ where:{email:req.params.email}, attributes: ['email'], include: [{ model: Report }] });
        if(!post){
            return res.status(505).json({
                msg: "Post not found",
                created: false,
                data: {post},
            });
        }
        let removed = await Report.destroy({
            where:{id:post.Report.id}
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
// TODO
module.exports.updateReport = async (req,res)=>{
    try{
        const post = await Post.findOne({ where:{email:req.params.email}, attributes: ['email'], include: [{ model: Report }] });
        if(!post){
            return res.status(505).json({
                msg: "Post not found",
                created: false,
                data: {post},
            });
        }
        const update_info = {
        ...req.body,
        };
        let updated = await Report.update(
            update_info,
            { // where
                where:{id: post.Report.id}
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