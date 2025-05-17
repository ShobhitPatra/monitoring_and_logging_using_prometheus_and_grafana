import client from "prom-client";

export const activeUsersGauge = new client.Gauge({
  name: "ACTIVE_USERS",
  help: "Counts the number of active users",
});
