import express from "express";
import cors from "cors";
import snapshotRouter from "./routes/snapshots.js";
import httpStatusCode from "./utils/httpStatusCode.js";

const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(cors({ origin: "*" }));

app.use("/states", snapshotRouter);
app.get("/health", (_, res) => res.status(httpStatusCode.OK).send("OK"));

export default app;
