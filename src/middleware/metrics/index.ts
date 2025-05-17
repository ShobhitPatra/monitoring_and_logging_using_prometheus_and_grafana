import { NextFunction, request, Request, Response } from "express";
import client from "prom-client";
import { requestsCounter } from "../../metrics/requestsCounter";
import { activeUsersGauge } from "../../metrics/activeUsersGauge";

const metricsMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const startTime = Date.now();
  activeUsersGauge.inc();

  res.on("finish", () => {
    const endTime = Date.now();
    console.log(`Request took ${endTime - startTime}ms`);
    requestsCounter.inc({
      method: req.method,
      route: req.route.path || req.path,
      stauts_code: res.statusCode,
    });
    activeUsersGauge.dec();
  });
  next();
};
export default metricsMiddleware;
