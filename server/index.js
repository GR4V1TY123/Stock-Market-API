import 'dotenv/config';
import cors from "cors";
import express from "express"
import { stockRoutes } from "./routes/stock.routes.js";

const app = express();
app.use(cors({
    origin: "*"
}))

app.use(express.json());

app.use("/stocks/api", stockRoutes)

app.get("/", (req,res) => {
    return res.status(200).send("INDIAN STOCK MARKET API IS LIVE")
})

app.listen(3000, () => {
    console.log("Server Started on port 3000 ..............");

})