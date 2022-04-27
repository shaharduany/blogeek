import { Fragment } from "react";

function Post(props){
    const title = props.title;
    const id = props.id;
    const content = props.content;
    const date = new Date(props.date).toLocaleDateString();
    const publishar = props.publishar;
    const commentsLength = props.comments.length;
    
    return (<Fragment>
        <h3>{title}</h3>
        <h5>{publishar}</h5>
        <p</p>
    </Fragment>)
}