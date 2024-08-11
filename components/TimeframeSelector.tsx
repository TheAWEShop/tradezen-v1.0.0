'use client';
import React from 'react';
import { Button } from './ui/button';

interface TimeframeSelectorProps {
    onChange: (timeframe: string) => void;
    selectedTimeframe: string;
}

const TimeframeSelector: React.FC<TimeframeSelectorProps> = ({ onChange, selectedTimeframe }) => {
    const timeframes = ['1min', '5min', '15min', '30min', '45min', '1h', '2h', '4h', '8h', '1day', '1week', '1month'];

    return (
        <div className="timeframe-selector box-border border-gray-300 block px-10">
            {timeframes.map((timeframe) => (
                <button
                    key={timeframe}
                    className={`timeframe-button my-1 py-1 text-sm px-2 rounded-sm  hover:bg-slate-100 ${timeframe === selectedTimeframe ? 'text-blue-500' : ''}`}
                    onClick={() => onChange(timeframe)}
                >
                    {timeframe}
                </button>
            ))}
        </div>
    );
};

export default TimeframeSelector;
