import axios from 'axios';

const API_KEY = process.env.ALPHA_VANTAGE_API_KEY;

export const fetchStockData = async (symbol: string) => {
    try {
        const response = await axios.get(
            `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${API_KEY}`
        );

        const data = response.data['Time Series (Daily)'];

        if (!data) {
            throw new Error('No data found for the given symbol.');
        }

        const formattedData = Object.keys(data).map(date => ({
            time: new Date(date).getTime() / 1000,
            open: parseFloat(data[date]['1. open']),
            high: parseFloat(data[date]['2. high']),
            low: parseFloat(data[date]['3. low']),
            close: parseFloat(data[date]['4. close']),
        }));

        formattedData.sort((a, b) => a.time - b.time);

        return formattedData;
    } catch (error) {
        console.error('Error fetching stock data:', error);
        return [];
    }
};
