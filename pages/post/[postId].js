import { useRouter } from "next/router";
import CommentForm from "../../components/posts/CommentFrom";
import PostComp from "../../components/posts/Post";
import PostView from "../../components/posts/PostView";
import getClient, { getPost } from "../../lib/db/db";

function SinglePostPage(props){
    const post = JSON.parse(props.post);
    
    
    if(props.error){
        console.log(props.error);
        return <h1>error</h1>
    }
    return (<div>
        <PostView post={post} />
        <CommentForm postId={post.id} />
    </div>);
}

export async function getServerSideProps(context){
    await getClient();
    let post = {};
    let error = false;
    try {
        post = await getPost(context.query.postId);
    } catch (err) {
        error = err;
    }

    return {
        props: {
            query: context.query.postId,
            post: JSON.stringify(post),
            error
        }
    }
}

export default SinglePostPage;