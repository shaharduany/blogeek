import axios from "axios";
import { Fragment } from "react";

function PostPage(props){

    return (<Fragment>
        <h1>POST PAGE</h1>
        <h3>message > {props.message}</h3>
    </Fragment>);
}

export async function getStaticProps(context){

    return {
        props: {
            message: "hello"
        },
    };
}

export default PostPage;