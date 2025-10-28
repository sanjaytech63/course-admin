import React, { useState, useEffect } from 'react';
import { ErrorState } from './ui/ErrorState';
import DeleteModal from './ui/DeleteModal';
import Pagination from './ui/Pagination';
import { useSubscribers } from '../hooks/useSubscribers';
import { SubscriberStats } from './ui/SubscriberStats';
import { SubscriberActions } from './ui/SubscriberActions';
import { SubscribersTable } from './ui/SubscribersTable';

const SubscribersManagement: React.FC = () => {
    const [searchText, setSearchText] = useState('');
    const [selectedSubscribers, setSelectedSubscribers] = useState<string[]>([]);
    const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; subscriber: any } | null>(null);
    const [bulkDeleteModal, setBulkDeleteModal] = useState(false);
    const [actionLoading, setActionLoading] = useState(false);

    const {
        subscribers,
        loading,
        error,
        pagination,
        fetchSubscribers,
        unsubscribeUser,
        bulkUnsubscribe,
        exportSubscribers,
        setPage,
    } = useSubscribers();

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            fetchSubscribers(searchText, 1, pagination.limit);
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [searchText]);

    const handleUnsubscribe = async (subscriber: any) => {
        setActionLoading(true);
        try {
            await unsubscribeUser(subscriber.email, subscriber._id);
            setDeleteModal(null);
        } catch (err) {
        } finally {
            setActionLoading(false);
        }
    };

    const handleBulkUnsubscribe = async () => {
        setActionLoading(true);
        try {
            await bulkUnsubscribe(selectedSubscribers);
            setSelectedSubscribers([]);
            setBulkDeleteModal(false);
        } catch (err) {
        } finally {
            setActionLoading(false);
        }
    };

    const handleExport = async () => {
        setActionLoading(true);
        try {
            await exportSubscribers();
        } catch (err) {
        } finally {
            setActionLoading(false);
        }
    };


    const handlePageChange = (page: number) => {
        setPage(page);
        setSelectedSubscribers([]);
    };

    const handleSelectSubscriber = (id: string) => {
        if (id === 'clear') {
            setSelectedSubscribers([]);
        } else {
            setSelectedSubscribers(prev =>
                prev.includes(id)
                    ? prev.filter(subId => subId !== id)
                    : [...prev, id]
            );
        }
    };

    const handleSelectAllActive = () => {
        const activeSubscriberIds = subscribers
            .filter(sub => sub.status === 'active')
            .map(sub => sub._id);
        setSelectedSubscribers(activeSubscriberIds);
    };

    const handleClearSelection = () => {
        setSelectedSubscribers([]);
    };

    const handleClearSearch = () => {
        setSearchText('');
    };

    if (error && !subscribers.length) {
        return (
            <ErrorState
                error={error}
                onRetry={() => fetchSubscribers(searchText, pagination.page, pagination.limit)}
                retryText="Try Again"
                fullScreen={false}
            />
        );
    }

    const activeSubscribers = subscribers.filter(sub => sub.status === 'active');
    const inactiveSubscribers = subscribers.filter(sub => sub.status === 'inactive');

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Newsletter Subscribers</h1>
                    <p className="text-gray-600 mt-1">Manage your newsletter subscribers and their preferences</p>
                </div>
            </div>

            <SubscriberStats
                total={pagination.total}
                active={activeSubscribers.length}
                inactive={inactiveSubscribers.length}
            />

            <SubscriberActions
                searchText={searchText}
                onSearchChange={setSearchText}
                selectedCount={selectedSubscribers.length}
                onClearSelection={handleClearSelection}
                onBulkUnsubscribe={() => setBulkDeleteModal(true)}
                onExport={handleExport}
                onRefresh={() => fetchSubscribers(searchText, pagination.page, pagination.limit)}
                loading={loading}
                actionLoading={actionLoading}
            />

            <SubscribersTable
                subscribers={subscribers}
                loading={loading}
                selectedSubscribers={selectedSubscribers}
                onSelectSubscriber={handleSelectSubscriber}
                onSelectAllActive={handleSelectAllActive}
                onUnsubscribe={(subscriber) => setDeleteModal({ isOpen: true, subscriber })}
                searchText={searchText}
                onClearSearch={handleClearSearch}
            />

            {subscribers.length > 0 && (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <Pagination
                        currentPage={pagination.page}
                        totalPages={pagination.totalPages}
                        onPageChange={handlePageChange}
                    />
                </div>
            )}

            <DeleteModal
                isOpen={!!deleteModal}
                title="Unsubscribe User"
                itemName={deleteModal?.subscriber?.email || ''}
                isLoading={actionLoading}
                onClose={() => setDeleteModal(null)}
                onDelete={() => deleteModal && handleUnsubscribe(deleteModal.subscriber)}
            />

            <DeleteModal
                isOpen={bulkDeleteModal}
                title="Unsubscribe Multiple Users"
                itemName={`${selectedSubscribers.length} subscribers`}
                isLoading={actionLoading}
                onClose={() => setBulkDeleteModal(false)}
                onDelete={handleBulkUnsubscribe}
            />
        </div>
    );
};

export default SubscribersManagement;