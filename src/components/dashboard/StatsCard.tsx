import React from 'react';
import { Card } from '../ui/Card';

interface StatsCardProps {
    title: string;
    value: string | number;
    icon: React.ReactNode;
    trend?: {
        value: number;
        isPositive: boolean;
    };
    className?: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({
    title,
    value,
    icon,
    trend,
    className = ''
}) => {
    return (
        <Card
            title={title}
            padding="lg"
        >

            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-600">Total {title}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
                    {trend && (
                        <p className={`text-sm mt-1 ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                            {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}% from last month
                        </p>
                    )}
                </div>
                <div className="p-3 bg-indigo-50 rounded-lg text-indigo-600">
                    {icon}
                </div>
            </div>

        </Card>
    );
};