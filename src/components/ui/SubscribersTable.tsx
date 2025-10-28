import React from 'react';
import { Card } from '../ui/Card';
import { EmptyState } from '../ui/EmptyState';
import Loader from '../ui/Loader';
import { formatDate } from '../../utils';
import Button from './Button';
import { FiTrash2 } from 'react-icons/fi';

interface Subscriber {
    _id: string;
    email: string;
    status: 'active' | 'inactive';
    subscribedAt: string;
    unsubscribedAt?: string;
    source?: string;
}

interface SubscribersTableProps {
    subscribers: Subscriber[];
    loading: boolean;
    selectedSubscribers: string[];
    onSelectSubscriber: (id: string) => void;
    onSelectAllActive: () => void;
    onUnsubscribe: (subscriber: Subscriber) => void;
    searchText: string;
    onClearSearch: () => void;
}

export const SubscribersTable: React.FC<SubscribersTableProps> = ({
    subscribers,
    loading,
    selectedSubscribers,
    onSelectSubscriber,
    onSelectAllActive,
    onUnsubscribe,
    searchText,
    onClearSearch,
}) => {
    const activeSubscribers = subscribers.filter(sub => sub.status === 'active');

    if (loading) {
        return (
            <Card title="Subscribers" padding="none">
                <div className="flex justify-center items-center py-12">
                    <Loader size="medium" label="Loading subscribers..." />
                </div>
            </Card>
        );
    }

    if (subscribers.length === 0) {
        return (
            <Card title="Subscribers" padding="none">
                <EmptyState
                    title="No subscribers found"
                    message={
                        searchText
                            ? "Try adjusting your search terms"
                            : "No subscribers have joined your newsletter yet"
                    }
                    variant="users"
                    action={
                        searchText ? (
                            <button
                                onClick={onClearSearch}
                                className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100"
                            >
                                Clear Search
                            </button>
                        ) : undefined
                    }
                />
            </Card>
        );
    }

    return (
        <Card title="Subscribers" padding="none">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                <div className="flex items-center gap-3">
                                    <input
                                        type="checkbox"
                                        checked={
                                            selectedSubscribers.length === activeSubscribers.length &&
                                            activeSubscribers.length > 0
                                        }
                                        onChange={
                                            selectedSubscribers.length ? () => onSelectSubscriber('clear') : onSelectAllActive
                                        }
                                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                    />
                                    Email
                                </div>
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Subscribed Date
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Source
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {subscribers.map((subscriber) => (
                            <tr key={subscriber._id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center gap-3">
                                        {subscriber.status === 'active' && (
                                            <input
                                                type="checkbox"
                                                checked={selectedSubscribers.includes(subscriber._id)}
                                                onChange={() => onSelectSubscriber(subscriber._id)}
                                                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                            />
                                        )}
                                        <div className="text-sm font-medium text-gray-900">
                                            {subscriber.email}
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span
                                        className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${subscriber.status === 'active'
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-red-100 text-red-800'
                                            }`}
                                    >
                                        {subscriber.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {formatDate(subscriber.subscribedAt)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {subscriber.source || 'Website'}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    {subscriber.status === 'active' && (
                                        <Button variant='danger'
                                            onClick={() => onUnsubscribe(subscriber)}
                                        >
                                            <FiTrash2 className="w-4 h-4" />
                                            <span>Unsubscribe</span>
                                        </Button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Card>
    );
};