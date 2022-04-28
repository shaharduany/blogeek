async function handler(req, res){
    const METHOD = req.method;
    const { page } = req.body;
    
    if(METHOD !== "POST"){
        res.status(422).json({
            message: "Impossible request",
        });
        return;
    }

    res.status(201).json({
        page,
        message: "Yay",
    });
}

export default handler;