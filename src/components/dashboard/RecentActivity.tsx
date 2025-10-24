import React from 'react';
import { Card } from '../ui/Card';


const activities = [
    { id: 1, user: 'John Doe', action: 'purchased', course: 'React Masterclass', time: '2 min ago' },
    { id: 2, user: 'Sarah Smith', action: 'enrolled in', course: 'JavaScript Fundamentals', time: '10 min ago' },
    { id: 3, user: 'Mike Johnson', action: 'completed', course: 'Advanced CSS', time: '1 hour ago' },
    { id: 4, user: 'Emily Davis', action: 'published', course: 'TypeScript Basics', time: '2 hours ago' },
];

export const RecentActivity: React.FC = () => {
    return (
        <Card
            title="Recent Activity"
            padding="lg"
        >
            <h3 className="text-lg font-semibold text-gray-900"></h3>


            <div className="space-y-4">
                {activities.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-primary-600 rounded-full mt-2"></div>
                        <div className="flex-1">
                            <p className="text-sm text-gray-900">
                                <span className="font-medium">{activity.user}</span> {activity.action}{' '}
                                <span className="font-medium">{activity.course}</span>
                            </p>
                            <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                        </div>
                    </div>
                ))}
            </div>

        </Card>
    );
};