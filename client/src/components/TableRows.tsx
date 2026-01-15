import {
    TableRow,
    TableCell,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

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

export default function TableRows({ stock }: { stock: Stock }) {
    const navigate = useNavigate()
    const isPositive = stock.change >= 0

    return (
        <TableRow className="hover:bg-slate-50 dark:hover:bg-slate-900/60 transition-colors">
            <TableCell className="font-medium">
                {stock.name}
            </TableCell>

            <TableCell className=" font-medium text-slate-900 dark:text-slate-100">
                {stock.price.toFixed(2)}
            </TableCell>

            <TableCell
                className={`${isPositive ? "text-green-600" : "text-red-600"
                    }`}
            >
                {isPositive ? "+" : ""}
                {stock.change.toFixed(2)}
            </TableCell>

            <TableCell
                className={` ${isPositive
                    ? "text-emerald-600 dark:text-emerald-400"
                    : "text-rose-600 dark:text-rose-400"

                    }`}
            >
                {isPositive ? "+" : ""}
                {stock.percentChange.toFixed(2)}%
            </TableCell>

            <TableCell>
                {stock.high.toFixed(2)}
            </TableCell>

            <TableCell>
                {stock.low.toFixed(2)}
            </TableCell>

            <TableCell className="text-slate-500 dark:text-slate-400">
                {stock.volume.toLocaleString()}
            </TableCell>

            <TableCell className=" text-xs font-medium">
                <span
                    className={`px-2 py-0.5 rounded-full text-xs font-medium
    ${stock.rating === "Bullish"
                            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                            : stock.rating === "Neutral" ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400" : "bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400"
                        }`}
                >
                    {stock.rating}
                </span>

            </TableCell>

            <TableCell className="">
                <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                        navigate(`/stock/${encodeURIComponent(stock.name)}`)
                    }
                >
                    View
                </Button>
            </TableCell>
        </TableRow>
    )
}
