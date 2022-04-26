import getClient from "../../../lib/db/db";
import User from '../../../lib/db/models/User';
import Posts from '../../../lib/db/models/Post';

async function handler(req, res){
    await getClient();

    const METHOD = req.method;
    if(METHOD !== "POST"){
        res.status(422).json({
            message: "Invalid method type"
        });
        return;
    }
    
    const { email, title, content } = req.body;
    let user;
    let post;

    try {
        user = await User.findOne({ email, });
        if(!user){
            res.status(404).json({
                message: "User not found"
            });
            return;
        }
    } catch (error) {
        res.status(422).json({ message: "Server temperarily down" });
        return;
    }

    try{
        post = new Posts({
            publisher: id,
            title,
            content,
        });
        await post.save();
        
        user.posts.push(post._id);
        await user.save();
    } catch(error){
        res.status(422).json({ message: "Something went wrong saving the post" });
        return;
    }

    res.status(201).json({
        message: "Ppst saved"
    });
}

export default handler;