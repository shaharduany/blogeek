function Button(props){
    const clickHandler = props.onClick;
    
    if(clickHandler){
        return (
            <div>
                <button onClick={clickHandler}>
                    {props.children}
                </button>
            </div>
        )
    } else {
        return (
            <div>
                <button type="submit">{props.children}</button>
            </div>
        );
    }
}

export default Button;