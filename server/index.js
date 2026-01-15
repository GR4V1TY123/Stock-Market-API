import 'dotenv/config';
import express from "express"
import { stockRoutes } from "./routes/stock.routes.js";

const app = express();

app.use(express.json());

app.use("/stocks/api", stockRoutes)

app.listen(3000, () => {
    console.log("Server Started on port 3000 ..............");

})