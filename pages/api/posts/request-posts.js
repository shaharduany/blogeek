import getClient, { getPostsAtIndex } from "../../../lib/db/db";

async function handler(req, res) {
    await getClient();

    const METHOD = req.method;
	const { page } = req.body;
    let posts;

	if (METHOD !== "POST") {
		res.status(422).json({
			message: "Impossible request",
		});
		return;
	}
	try {
		posts = await getPostsAtIndex(page - 1, page * 10);
	} catch (error) {
        res.status(422).json({
            message: "Something went wrong at the server side",
            error,
        });
        return;
    }

	res.status(201).json({
		posts,
		page,
		message: "Yay",
	});
}

export default handler;
