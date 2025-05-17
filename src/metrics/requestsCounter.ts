import client from "prom-client";
export const requestsCounter = new client.Counter({
  name: "REQUEST_COUNT",
  help: "Counts total number of HTTP requests",
  labelNames: ["method", "route", "stauts_code"],
});
