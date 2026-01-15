import { useEffect, useState } from "react"
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent,
} from "@/components/ui/tabs"
import TableRows from "@/components/TableRows"

type Stock = {
    name: string
    price: number
    change: number
    percentChange: number
    high: number
    low: number
    volume: number
    rating: string
}

export default function Home() {
    const [gainers, setGainers] = useState<Stock[]>([])
    const [losers, setLosers] = useState<Stock[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchTrendingStocks = async () => {
            try {
                const res = await fetch(`${import.meta.env.SERVER_URL}/stocks/api/trending`)

                if (!res.ok) {
                    throw new Error("Failed to fetch stock data")
                }

                const data = await res.json()

                const rawGainers =
                    data?.stocks?.trending_stocks?.top_gainers || []

                const rawLosers =
                    data?.stocks?.trending_stocks?.top_losers || []

                const normalize = (arr: any[]): Stock[] =>
                    arr.map((s) => ({
                        name: s.company_name,
                        price: Number(s.price),
                        change: Number(s.net_change),
                        percentChange: Number(s.percent_change),
                        high: Number(s.high),
                        low: Number(s.low),
                        volume: Number(s.volume),
                        rating: s.overall_rating,
                    }))

                setGainers(normalize(rawGainers))
                setLosers(normalize(rawLosers))
            } catch (err: any) {
                setError(err.message || "Something went wrong")
            } finally {
                setLoading(false)
            }
        }

        fetchTrendingStocks()
    }, [])

    const renderTable = (data: Stock[]) => (
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-sm">
            <Table>
                <TableHeader className="bg-slate-100 dark:bg-slate-900">
                    <TableRow className="border-b border-slate-300 dark:border-slate-700">

                        <TableHead className="text-slate-600 dark:text-slate-300 font-semibold">Stock</TableHead>
                        <TableHead className="text-slate-600 dark:text-slate-300 font-semibold">Price (₹)</TableHead>
                        <TableHead className="text-slate-600 dark:text-slate-300 font-semibold">Change</TableHead>
                        <TableHead className="text-slate-600 dark:text-slate-300 font-semibold">% Chg</TableHead>
                        <TableHead className="text-slate-600 dark:text-slate-300 font-semibold">Day High</TableHead>
                        <TableHead className="text-slate-600 dark:text-slate-300 font-semibold">Day Low</TableHead>
                        <TableHead className="text-slate-600 dark:text-slate-300 font-semibold">Volume</TableHead>
                        <TableHead className="text-slate-600 dark:text-slate-300 font-semibold">Trend</TableHead>
                        <TableHead className="text-slate-600 dark:text-slate-300 font-semibold">Action</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {data.map((stock) => (
                        <TableRows key={stock.name} stock={stock} />
                    ))}
                </TableBody>
            </Table>
        </div>
    )

    return (
        <div className="min-h-screen bg-background px-6 py-8">
            <div className="mb-6">
                <h1 className="text-2xl font-semibold">
                    Trending Indian Stocks
                </h1>
            </div>

            {loading && (
                <p className="text-muted-foreground">
                    Loading market data…
                </p>
            )}

            {error && (
                <p className="text-red-500">{error}</p>
            )}

            {!loading && !error && (
                <Tabs defaultValue="gainers" className="w-full">
                    <TabsList>
                        <TabsTrigger value="gainers">
                            Top Gainers
                        </TabsTrigger>
                        <TabsTrigger value="losers">
                            Top Losers
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="gainers" className="mt-4">
                        {renderTable(gainers)}
                    </TabsContent>

                    <TabsContent value="losers" className="mt-4">
                        {renderTable(losers)}
                    </TabsContent>
                </Tabs>
            )}
        </div>
    )
}
