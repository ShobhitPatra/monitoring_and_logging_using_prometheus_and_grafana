"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const requestsCounter_1 = require("../../metrics/requestsCounter");
const activeUsersGauge_1 = require("../../metrics/activeUsersGauge");
const metricsMiddleware = (req, res, next) => {
    const startTime = Date.now();
    activeUsersGauge_1.activeUsersGauge.inc();
    res.on("finish", () => {
        const endTime = Date.now();
        console.log(`Request took ${endTime - startTime}ms`);
        requestsCounter_1.requestsCounter.inc({
            method: req.method,
            route: req.route.path || req.path,
            stauts_code: res.statusCode,
        });
        activeUsersGauge_1.activeUsersGauge.dec();
    });
    next();
};
exports.default = metricsMiddleware;
