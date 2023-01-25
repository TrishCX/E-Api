import { Router } from "express";
import client from "../../functions/client/serverClient.js";
const router = Router();
router?.get("/get-star/:name", async (request, response) => {
    const starName = request.params.name;
    try {
        const res = await client.search(starName);
        return response.status(200).send({
            ...res,
            status: 200,
        });
    }
    catch (e) {
        return response.status(404).send({
            status: 404,
            message: "No star found for the specified name",
        });
    }
});
export default router;
