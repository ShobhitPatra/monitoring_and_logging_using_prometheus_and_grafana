"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prom_client_1 = __importDefault(require("prom-client"));
const requestCounter = new prom_client_1.default.Counter({
    name: "REQUEST_COUNT",
    help: "counts total number of HTTP requests",
    labelNames: ["method", "route", "stauts_code"],
});
const requestCounterMiddleware = (req, res, next) => {
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
exports.default = requestCounterMiddleware;
