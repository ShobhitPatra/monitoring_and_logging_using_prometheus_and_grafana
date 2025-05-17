"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestsCounter = void 0;
const prom_client_1 = __importDefault(require("prom-client"));
exports.requestsCounter = new prom_client_1.default.Counter({
    name: "REQUEST_COUNT",
    help: "Counts total number of HTTP requests",
    labelNames: ["method", "route", "stauts_code"],
});
