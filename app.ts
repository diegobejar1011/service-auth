import express, { Request, Response } from "express";
import cors from "cors";
import { db } from "./core/data/mysql/application/conn";
import { userRouter } from "./user/infraestructure/UserRouter";
import dotenv from "dotenv";

const app = express();

app.use(cors());
app.use(express.json());

dotenv.config();

const port = process.env.PORT || 3001;
app.set("PORT", port);

app.listen(app.get("PORT"), () => {
    console.log("API running in server...");
});

app.use("/users", userRouter);

db.connect()
.then(() => {
    console.log("Connected to db...");
})
.catch((error: any) => {
    throw new Error(error.message);
});