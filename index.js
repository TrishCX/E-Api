import cors from "cors";
import express from "express";
import { getStarRouter, videoRouter } from "./routers/exports/index.js";
const app = express();
const port = 5000;
express.json({ strict: true });
app.use(cors({ origin: "*" }));
app.use("/api/v1", getStarRouter);
app.use("/api/v1", videoRouter);
app.listen(port, () => {
    return console.log("The server is now live.");
});
