'use client';
import { fetchTickerData } from '@/utils/fetchTickerData';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

type Props = {};

interface StockData {
  name: string;
  price: number;
  change: number;
  logo: string;
  exchange: string;
}

const StockProfile = (props: Props) => {
  const [loading, setLoading] = useState(true);
  const [stockData, setStockData] = useState<StockData | null>(null);
  const params = useParams();
  const { exchange, symbol } = params;

  useEffect(() => {
    const fetchData = async () => {
      if (symbol && exchange) {
        try {
          const data = await fetchTickerData(`${symbol}:${exchange}`);
          setStockData(data);
          console.log(data);
        } catch (error) {
          console.error('Error fetching stock data:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [exchange, symbol]);

  if (loading) {
    return <div className="container mx-auto p-4">Loading...</div>;
  }

  if (!stockData) {
    return <div className="container mx-auto p-4">No data available</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1>{stockData.name}</h1>
      <p>Price: {stockData.price}</p>
      <p>Change: {stockData.change}</p>
      <img src={stockData.logo} alt={`${stockData.name} logo`} />
      <p>Exchange: {stockData.exchange}</p>
    </div>
  );
};

export default StockProfile;
