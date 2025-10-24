import React from 'react';
import { IconType } from 'react-icons';
import { FiUsers, FiSearch, FiInbox } from 'react-icons/fi';

interface EmptyStateProps {
    title?: string;
    message?: string;
    icon?: IconType | string;
    iconSize?: number;
    className?: string;
    action?: React.ReactNode;
    variant?: 'default' | 'search' | 'users';
}

export const EmptyState: React.FC<EmptyStateProps> = ({
    title = 'No data found',
    message = 'There is no data to display at the moment.',
    icon,
    iconSize = 48,
    className = '',
    action,
    variant = 'default'
}) => {
    const getDefaultIcon = () => {
        switch (variant) {
            case 'users':
                return FiUsers;
            case 'search':
                return FiSearch;
            default:
                return FiInbox;
        }
    };

    const IconComponent = icon || getDefaultIcon();

    const getIconColor = () => {
        switch (variant) {
            case 'users':
                return 'text-blue-500';
            case 'search':
                return 'text-purple-500';
            default:
                return 'text-gray-400';
        }
    };

    return (
        <div className={`text-center py-12 px-4 ${className}`}>
            <div className="flex justify-center mb-4">
                {typeof IconComponent === 'string' ? (
                    <img
                        src={IconComponent}
                        alt=""
                        className={`w-${iconSize / 4} h-${iconSize / 4} opacity-50`}
                    />
                ) : (
                    <IconComponent
                        size={iconSize}
                        className={`mx-auto ${getIconColor()} opacity-70`}
                    />
                )}
            </div>

            <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
            <p className="text-gray-500 text-sm max-w-sm mx-auto mb-6">{message}</p>

            {action && (
                <div className="flex justify-center">
                    {action}
                </div>
            )}
        </div>
    );
};