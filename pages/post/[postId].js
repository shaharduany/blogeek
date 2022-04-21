import { useRouter } from "next/router";

function SinglePostPage(props){
    const router = useRouter();

    console.log(router.query);

    return (<h1>Params page</h1>);
}

export default SinglePostPage;