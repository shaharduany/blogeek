import getClient, { getRecentPosts } from "../../../lib/db/db";

function handler(req, res){
    const METHOD = req.method;
    console.log('got request');
    if(METHOD === "GET"){
        try {
            await getClient();
            const posts = await getRecentPosts();
            res.status(200).json({
                message: "Posts recieved",
                posts,
            });
        } catch (error){
            res.status(500).json({
                message: `Something went wrong`,
            });
        }
    }
}

export default handler;