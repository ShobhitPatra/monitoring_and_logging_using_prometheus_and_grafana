import express from "express";
import client from "prom-client";
import metricsMiddleware from "./middleware/metrics";
const app = express();

app.use(express.json());
app.use(metricsMiddleware);
app.get("/", (req, res) => {
  res.json("hello from home");
});

app.get("/metrics", async (req, res) => {
  const metrics = await client.register.metrics();
  res.set("Content-Type", client.register.contentType);
  res.end(metrics);
});
const PORT = 8000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
