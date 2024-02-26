import express from "express";
import { Response, Request } from "express";
import cors from "cors";
import { dbConnect } from "./db/db";
import dotenv from "dotenv";
const userRoutes = require("./routes/user.routes");
const todoRoutes = require("./routes/todo.routes");

const app = express();
dotenv.config()
app.use(
    cors({
        origin: '*'
    })
)
app.use(express.json());

dbConnect()

//routes
app.get('/', (req: Request, res: Response) => {
    res.send({ title: 'Express js' })
});


app.use("/user", userRoutes);
app.use("/todo", todoRoutes);

const port = process.env.PORT
app.listen(port, () => {
    console.log(`server running on port ${port}`);
})
module.exports = app;