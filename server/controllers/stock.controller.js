const apiKey = process.env.STOCK_API_KEY;

export const fetchTrendingStocks = async (req, res) => {
    try {
        const response = await fetch("https://stock.indianapi.in/trending", {
            method: "GET",
            headers: { "X-Api-Key": apiKey }
        })
        const data = await response.json();
        return res.status(200).json({
            stocks: data,
            message: "Success"
        })
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            message: "Internal Server error fetching trending stock"
        })
    }
}

export const fetchStockByName = async (req, res) => {
    const { name } = req.params
    try {
        const response = await fetch(`https://stock.indianapi.in/stock?name=${name}`, {
            method: "GET",
            headers: { "X-Api-Key": apiKey }
        })
        const data = await response.json();
        return res.status(200).json({
            stock: data,
            message: "Success"
        })
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            message: "Internal Server error fetching trending stock"
        })
    }
} 