function CommentComp(props) {
	const { sender, content, date } = props;

    const dateString = new Date(date).toLocaleString();
    if(!sender || !content || !date){
        return <>
            <h1>ERROR</h1>
        </>
    };

    return (<div>
        <h5>{sender} @ {dateString}</h5>
        <p>{content}</p>
    </div>)
}

export default CommentComp;
