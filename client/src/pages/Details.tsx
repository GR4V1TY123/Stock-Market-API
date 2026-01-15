import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";

type Officer = {
    firstName: string;
    lastName: string;
    age?: string | null;
    title?: { Value: string };
};

type CompanyProfile = {
    companyDescription: string;
    exchangeCodeBse: string;
    exchangeCodeNse: string;
    officers?: { officer: Officer[] };
};

type CurrentPrice = {
    BSE: string;
    NSE: string;
};

type Stock = {
    companyName: string;
    industry: string;
    percentChange: string;
    yearHigh: string;
    yearLow: string;
    currentPrice?: CurrentPrice;
    companyProfile?: CompanyProfile;
};


export default function Details() {
    const { name } = useParams();
    const [data, setData] = useState<Stock | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchDetails() {
            try {
                const res = await fetch(`http://localhost:3000/stocks/api/stock/${name}`);
                if (!res.ok) throw new Error("Failed to fetch stock details");
                const json: { stock: Stock } = await res.json();
                setData(json.stock);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchDetails();
    }, [name]);


    if (loading)
        return <div className="text-center mt-20 text-gray-500">Loading...</div>;
    if (error)
        return <div className="text-center mt-20 text-red-500">Error: {error}</div>;
    if (!data)
        return <div className="text-center mt-20 text-gray-500">No data found</div>;

    const { companyName, industry, percentChange, yearHigh, yearLow, currentPrice, companyProfile } = data;
    const isPositive = Number(percentChange) >= 0;

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-6">
            <Card className="p-6">
                <h1 className="text-3xl font-bold">{companyName}</h1>
                <p className="text-gray-500 mt-1">{industry}</p>

                <div className="flex items-baseline gap-4 mt-3">
                    <span className="text-2xl font-semibold">₹{currentPrice?.NSE}</span>
                    <span className={`text-lg font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                        {isPositive ? '+' : ''}{percentChange}%
                    </span>
                </div>
            </Card>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="p-4 text-center">
                    <p className="text-gray-500">52W High</p>
                    <p className="font-semibold">₹{yearHigh}</p>
                </Card>
                <Card className="p-4 text-center">
                    <p className="text-gray-500">52W Low</p>
                    <p className="font-semibold">₹{yearLow}</p>
                </Card>
                <Card className="p-4 text-center">
                    <p className="text-gray-500">BSE Code</p>
                    <p className="font-semibold">{companyProfile?.exchangeCodeBse}</p>
                </Card>
                <Card className="p-4 text-center">
                    <p className="text-gray-500">NSE Symbol</p>
                    <p className="font-semibold">{companyProfile?.exchangeCodeNse}</p>
                </Card>
            </div>

            <Card className="p-6">
                <h3 className="text-xl font-semibold mb-2">About the company</h3>
                <p className="text-gray-700 leading-relaxed">
                    {companyProfile?.companyDescription}
                </p>
            </Card>
        </div>
    );
}
