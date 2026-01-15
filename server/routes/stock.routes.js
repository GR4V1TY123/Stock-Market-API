import express from "express"
import { fetchStockByName, fetchTrendingStocks } from "../controllers/stock.controller.js"
const router = express.Router()

router.get("/trending", fetchTrendingStocks)
router.get("/stock/:name", fetchStockByName)

export {router as stockRoutes}