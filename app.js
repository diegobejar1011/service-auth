"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const conn_1 = require("./core/data/mysql/application/conn");
const UserRouter_1 = require("./user/infraestructure/UserRouter");
const dotenv_1 = __importDefault(require("dotenv"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
dotenv_1.default.config();
const port = process.env.PORT || 3001;
app.set("PORT", port);
app.listen(app.get("PORT"), () => {
    console.log("API running in server...");
});
app.get("/", (req, res) => {
    res.send("Hola, estas en dev!");
});
app.use("/users", UserRouter_1.userRouter);
conn_1.db.connect()
    .then(() => {
    console.log("Connected to db...");
})
    .catch((error) => {
    throw new Error(error.message);
});
