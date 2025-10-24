import React from 'react';
import Modal from '../../components/ui/Modal';
import InputField from '../../components/ui/InputField';
import Button from '../../components/ui/Button';
import { BiMailSend, BiUser, BiLock } from 'react-icons/bi';
import { UserErrors, UserFormData } from '../../types';

interface UserFormModalProps {
    isOpen: boolean;
    type?: 'create' | 'edit'
    formData: UserFormData;
    errors: UserErrors;
    loading: boolean;
    onChange: (field: keyof UserFormData) => (value: string) => void;
    onSubmit: (e: React.FormEvent) => void;
    onClose: () => void;
}

export const UserFormModal: React.FC<UserFormModalProps> = ({
    isOpen,
    type,
    formData,
    errors,
    loading,
    onChange,
    onSubmit,
    onClose
}) => {
    const title = type === 'create' ? 'Add New User' : 'Edit User';
    const submitText = type === 'create' ? 'Create User' : 'Update User';

    return (
        <Modal
            isOpen={isOpen}
            title={title}
            onClose={onClose}
            size="md"
        >
            <form onSubmit={onSubmit} className="space-y-6">
                <div className="space-y-4">
                    <InputField
                        label="Full Name"
                        placeholder="Enter full name"
                        type="text"
                        value={formData.fullName}
                        onChange={onChange('fullName')}
                        error={errors.fullName}
                        icon={<BiUser className="text-gray-400" />}
                        disabled={loading}
                    />

                    <InputField
                        label="Email Address"
                        type="email"
                        placeholder="Enter email address"
                        value={formData.email}
                        onChange={onChange('email')}
                        error={errors.email}
                        icon={<BiMailSend className="text-gray-400" />}
                        disabled={loading}
                    />

                    {type === 'create' && (
                        <InputField
                            label="Password"
                            type="password"
                            placeholder="Enter password"
                            value={formData.password}
                            onChange={onChange('password')}
                            error={errors.password}
                            icon={<BiLock className="text-gray-400" />}
                            disabled={loading}
                        />
                    )}
                </div>

                <div className="flex justify-end space-x-3">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={onClose}
                        disabled={loading}
                        className="min-w-20"
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        isLoading={loading}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white min-w-20"
                    >
                        {submitText}
                    </Button>
                </div>
            </form>
        </Modal>
    );
};