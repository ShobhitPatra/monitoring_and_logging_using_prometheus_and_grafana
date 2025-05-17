import { NextFunction, request, Request, Response } from "express";
import client from "prom-client";

const requestCounter = new client.Counter({
  name: "REQUEST_COUNT",
  help: "counts total number of HTTP requests",
  labelNames: ["method", "route", "stauts_code"],
});
const requestCounterMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const startTime = Date.now();
  res.on("finish", () => {
    const endTime = Date.now();
    console.log(`Request took ${endTime - startTime}ms`);
    requestCounter.inc({
      method: req.method,
      route: req.route.path || req.path,
      stauts_code: res.statusCode,
    });
  });
  next();
};
export default requestCounterMiddleware;
