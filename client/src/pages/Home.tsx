import { useEffect, useState } from "react"

export default function Home() {
    const [stocks, setStocks] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchTrendingStocks = async () => {
            try {
                const res = await fetch("http://localhost:3000/stocks/api/trending")

                if (!res.ok) {
                    throw new Error("Failed to fetch stock data")
                }

                const data = await res.json()
                setStocks(data?.data || [])
            } catch (err: any) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchTrendingStocks()
    }, [])

    return (
        <div className="min-h-screen bg-background px-6 py-8">
            <h1 className="text-2xl font-semibold mb-6">
                Trending Indian Stocks
            </h1>

            {loading && (
                <p className="text-muted-foreground">Loading data...</p>
            )}

            {error && (
                <p className="text-red-500">{error}</p>
            )}

            {!loading && !error && (
                <div className="overflow-x-auto rounded-lg border">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-muted">
                            <tr>
                                <th className="px-4 py-3 font-medium">Stock</th>
                                <th className="px-4 py-3 font-medium">Price</th>
                                <th className="px-4 py-3 font-medium">Change</th>
                                <th className="px-4 py-3 font-medium">% Change</th>
                            </tr>
                        </thead>

                        <tbody>
                            {stocks.map((stock, idx) => {
                                const isPositive = Number(stock.change) >= 0

                                return (
                                    <tr
                                        key={idx}
                                        className="border-t hover:bg-muted/50 transition"
                                    >
                                        <td className="px-4 py-3 font-medium">
                                            {stock.symbol || stock.name}
                                        </td>

                                        <td className="px-4 py-3">
                                            ₹{stock.price}
                                        </td>

                                        <td
                                            className={`px-4 py-3 ${isPositive ? "text-green-600" : "text-red-600"
                                                }`}
                                        >
                                            {stock.change}
                                        </td>

                                        <td
                                            className={`px-4 py-3 ${isPositive ? "text-green-600" : "text-red-600"
                                                }`}
                                        >
                                            {stock.percentChange}%
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}
