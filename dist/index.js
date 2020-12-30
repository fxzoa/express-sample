"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const body_parser_1 = __importDefault(require("body-parser"));
const path_1 = __importDefault(require("path"));
const user_db_1 = require("./user-db");
const app = express_1.default();
app.listen(4000);
morgan_1.default.token("localDate", function getDate(req) {
    return new Date().toLocaleString();
});
morgan_1.default.format("combined", ":remote-addr :remote-user [:localDate] :method :url :status :res[content-length]");
app.use(morgan_1.default("combined"));
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
app.use(express_1.default.static(path_1.default.join(__dirname, "files")));
app.use(body_parser_1.default.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Content-Type", "application/json");
    res.cookie("name", "abc", {
        domain: "localhost",
        path: "/",
        expires: new Date(Date.now() + 900000),
        secure: false,
        httpOnly: true,
    });
    next();
});
app.get("/users", function (req, res) {
    console.log("## Content-Type: %s ##", req.get("Content-Type"));
    console.log(`## ${req.method} ${req.originalUrl} from ${req.ip} ##`);
    res.append("Link", ["<http://localhost:3000/>"]);
    res.append("Set-Cookie", "foo=bar; Path=/; HttpOnly");
    res.append("Warning", "199 Miscellaneous warning");
    res.json(user_db_1.users);
});
app.get("/users/:id", function (req, res) {
    for (let i = 0; i < user_db_1.users.length; i++) {
        if (user_db_1.users[i].id == Number(req.params.id)) {
            res.status(200).json(user_db_1.users[i]);
        }
    }
});
app.put("/users", function (req, res) {
    user_db_1.users.push(req.body);
    res.status(201).end();
});
app.post("/users/:id", function (req, res) {
    for (let i = 0; i < user_db_1.users.length; i++) {
        if (user_db_1.users[i].id == Number(req.params.id)) {
            user_db_1.users[i] = req.body;
        }
    }
    res.status(205).end();
});
app.delete("/users/:id", function (req, res) {
    for (let i = 0; i < user_db_1.users.length; i++) {
        if (user_db_1.users[i].id == Number(req.params.id)) {
            user_db_1.users.splice(i, 1);
        }
    }
    res.status(204).end();
});
console.log("express listing in port: 4000");
//# sourceMappingURL=index.js.map