import React, { useState, useEffect } from 'react';
import { useStore } from '../store/store';
import { Table } from '../components/ui/Table';
import InputField from '../components/ui/InputField';
import { createUser, deleteUser, updateUser } from '../api/authService';
import Loader from '../components/ui/Loader';
import { ErrorState } from '../components/ui/ErrorState';
import { handleError, handleSuccess } from '../utils/toastHandler';
import DeleteModal from '../components/ui/DeleteModal';
import { UsersHeader } from '../components/ui/UsersHeader';
import { createColumns } from '../config/tableColumns';
import { useFetch } from '../hooks/useFetch';
import { UserFormModal } from '../components/ui/UserFormModal';

export const Users: React.FC = () => {
    const { openModal, closeModal, isOpen, type, data } = useStore();
    const [searchTerm, setSearchTerm] = useState<string>('');
    const { loading, users, fetchErrors, fetchUsers } = useFetch();
    const [userLoading, setUserLoading] = useState(false)
    const [errors, setErrors] = useState({ fullName: '', email: '', password: '' });
    const [filteredUsers, setFilteredUsers] = useState<any[]>([]);

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: ""
    });

    useEffect(() => {
        if (!searchTerm.trim()) {
            setFilteredUsers(users);
            return;
        }

        const filtered = users.filter((user: any) => {
            const fullNameMatch = user.fullName?.toLowerCase().includes(searchTerm.toLowerCase());
            const emailMatch = user.email?.toLowerCase().includes(searchTerm.toLowerCase());
            return fullNameMatch || emailMatch;
        });

        setFilteredUsers(filtered);
    }, [users, searchTerm]);

    const handleChange = (field: string) => (value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const resetForm = () => {
        setFormData({
            fullName: "",
            email: "",
            password: ""
        });
        setErrors({ fullName: '', email: '', password: '' });
    };

    const handleCreateUser = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setUserLoading(true);
            const { fullName, email, password } = formData;

            if (!fullName || !email || !password) {
                handleError('Please fill all required fields');
                return;
            }

            const res = await createUser({ fullName, email, password });
            handleSuccess(res?.message);

            await fetchUsers();
            closeModal();
            resetForm();

        } catch (err) {
            if (err instanceof Error && 'issues' in err) {
                const zodError = err as any;
                const fieldErrors: any = {};

                if (Array.isArray(zodError.issues)) {
                    zodError.issues.forEach((issue: any) => {
                        if (issue.path?.[0]) fieldErrors[issue.path[0]] = issue.message;
                    });
                }

                setErrors(fieldErrors);
            } else {
                handleError(err);
            }
        } finally {
            setUserLoading(false);
        }
    }

    const updateUsers = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setUserLoading(true);
            const { fullName, email } = formData;
            const userId = data?._id;

            if (!userId && type === 'edit') {
                handleError('User ID not found');
                return;
            }

            if (!fullName || !email) {
                handleError('Please fill all required fields');
                return;
            }

            const res = await updateUser(userId, { fullName, email });
            handleSuccess(res?.message);

            await fetchUsers();
            closeModal();
            resetForm();

        } catch (err) {
            if (err instanceof Error && 'issues' in err) {
                const zodError = err as any;
                const fieldErrors: any = {};

                if (Array.isArray(zodError.issues)) {
                    zodError.issues.forEach((issue: any) => {
                        if (issue.path?.[0]) fieldErrors[issue.path[0]] = issue.message;
                    });
                }

                setErrors(fieldErrors);
            } else {
                handleError(err);
            }
        } finally {
            setUserLoading(false);
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        if (type === 'create') {
            handleCreateUser(e);
        } else {
            updateUsers(e);
        }
    }

    const onCreateUser = () => {
        resetForm();
        openModal('create');
    };

    const onEdit = (user: any) => {
        setFormData({
            fullName: user.fullName || "",
            email: user.email || "",
            password: ""
        });
        setErrors({ fullName: '', email: '', password: '' });
        openModal('edit', user);
    };

    const onDelete = (user: any) => {
        openModal('delete', user);
    };

    const handleDelete = async () => {
        if (!data?._id) {
            handleError('No user selected for deletion');
            return;
        }

        try {
            setUserLoading(true);
            const res = await deleteUser(data._id);
            console.log(res,"res");
            
            handleSuccess(res.message || 'User deleted successfully');

            await fetchUsers();
            closeModal();

        } catch (err: any) {
            console.error('Delete error:', err);
            if (err.response?.data?.message) {
                handleError(err.response.data.message);
            } else {
                handleError('Failed to delete user');
            }
        } finally {
            setUserLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-full">
                <Loader size='medium' label='Loading...' />
            </div>
        );
    }

    if (fetchErrors) return <ErrorState onRetry={fetchUsers} fullScreen error={fetchErrors} />

    return (
        <div className="space-y-6">
            <UsersHeader
                userCount={users.length}
                filteredCount={filteredUsers.length}
                onCreateUser={onCreateUser}
            />

            <div className="flex flex-col sm:flex-row gap-4">
                <InputField
                    placeholder="Search users by name or email..."
                    value={searchTerm}
                    onChange={setSearchTerm}
                    className="sm:max-w-xs"
                />
            </div>

            <Table
                columns={createColumns({ onEdit, onDelete })}
                data={filteredUsers}
                emptyMessage={searchTerm ? "No users found matching your search" : "No users available"}
            />

            {(type === 'create' || type === 'edit') && (
                <UserFormModal
                    isOpen={isOpen}
                    type={type}
                    formData={formData}
                    errors={errors}
                    loading={userLoading}
                    onChange={handleChange}
                    onSubmit={handleSubmit}
                    onClose={() => {
                        resetForm();
                        closeModal();
                    }}
                />
            )}

            {type === 'delete' && (
                <DeleteModal
                    isOpen={isOpen}
                    title="Delete User"
                    itemName={data?.fullName || 'this user'}
                    onClose={closeModal}
                    onDelete={handleDelete}
                    isLoading={userLoading}
                    size="sm"
                />
            )}
        </div>
    );
};