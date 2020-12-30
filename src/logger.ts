import debug from "debug";
import morgan from "morgan";

morgan.token("localDate", function getDate(req: Request): string {
  return new Date().toLocaleString();
});

morgan.format(
  "combined",
  ":remote-addr :remote-user [:localDate] :method :url :status :res[content-length]"
);

export let logger = morgan("combined", {
  stream: { write: (msg) => debug("info")(msg) },
});
