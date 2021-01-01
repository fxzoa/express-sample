import morgan from "morgan";
import { Request } from "express";

morgan.token("localDate", function getDate(req: Request): string {
  return new Date().toLocaleString();
});

morgan.format(
  "stream",
  ":remote-addr :remote-user [:localDate] :method :url :status :res[content-length]"
);

export let logger = morgan("combined");
