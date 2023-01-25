import { Router } from "express";
import client from "../../functions/client/serverClient.js";
const router = Router();
router.get("/video/get/:videoQuery", async (request, response) => {
    const videoQuery = request.params.videoQuery;
    if (!videoQuery)
        return response.status(400).send({
            error: true,
            message: "No query specified",
        });
    try {
        const res = await client.findVideo(videoQuery);
        return response.status(200).send({
            res,
            error: false,
        });
    }
    catch (e) {
        return response.status(404).send({
            content: "Unable to fetch data.",
            error: true,
        });
    }
});
export default router;
