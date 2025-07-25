import express from "express";
import cors from "cors";
import createError from "http-errors";
import snapshotRouter from "./routes/snapshots.js";
import httpStatusCode from "./utils/httpStatusCode.js";

const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(cors({ origin: "*" }));

app.use("/states", snapshotRouter);
app.get("/health", (_, res) => res.status(httpStatusCode.OK).send("OK"));

app.get("/", (req, res) => {
  res.status(httpStatusCode.OK).json({ message: "Server is running" });
});

app.use((req, res, next) => {
  next(createError(httpStatusCode.NOT_FOUND));
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || httpStatusCode.INTERNAL_SERVER_ERROR).json({
    message: err.message,
  });
});

export default app;
