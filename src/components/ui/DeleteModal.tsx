import React from 'react';
import Modal from './Modal';
import Button from './Button';

interface DeleteModalProps {
    isOpen: boolean;
    title?: string;
    itemName: string;
    isLoading?: boolean;
    onClose: () => void;
    onDelete: () => void;
    size?: 'sm' | 'md' | 'lg' | 'xl';
}

const DeleteModal: React.FC<DeleteModalProps> = ({
    isOpen,
    title = 'Delete Item',
    itemName,
    isLoading,
    onClose,
    onDelete,
    size = 'sm',
}) => {
    return (
        <Modal isOpen={isOpen} title={title} onClose={onClose} size={size}>
            <div className="space-y-4">
                <p className="text-gray-600">
                    Are you sure you want to delete <strong>{itemName}</strong>? This action cannot be undone.
                </p>
                <div className="flex justify-end space-x-3">
                    <Button variant="outline" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button isLoading={isLoading} variant="danger" onClick={onDelete}>
                        Delete
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default DeleteModal;
