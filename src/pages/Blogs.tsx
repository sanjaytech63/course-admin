import React, { useEffect, useState, useMemo } from 'react';
import { ZodError } from 'zod';
import { validateImage } from '../validations/news.validator';
import { useStore } from '../store/store';
import Button from '../components/ui/Button';
import { useSearchParams } from 'react-router-dom';
import InputField from '../components/ui/InputField';
import SelectField from '../components/ui/SelectField';
import BlogGrid from '../components/ui/BlogGrid';
import BlogFormModal from '../components/ui/BlogFormModal';
import DeleteModal from '../components/ui/DeleteModal';
import BlogViewModal from '../components/ui/BlogViewModa';
import { createBlog, deleteBlogById, updateBlog } from '../api/blogService';
import { handleError, handleSuccess } from '../utils/toastHandler';
import { useFetchBlogs } from '../hooks/useFetchBlogs';
import { BlogFilters, BlogFormData } from '../types/blog.types';
import { categoryOptions, itemsPerPageOptions, badgeOptions, getCategoryLabel } from '../constants/index';
import PaginationWrapper from '../components/ui/PaginationWrapper';
import { FiRefreshCw } from 'react-icons/fi';

export const Blogs: React.FC = () => {
    const [formData, setFormData] = useState<BlogFormData>({
        title: '',
        description: '',
        author: '',
        category: '',
        readTime: '',
        badge: '',
        image: ''
    });
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [selectedBlog, setSelectedBlog] = useState<any>(null);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);

    const [searchParams, setSearchParams] = useSearchParams();
    const page = parseInt(searchParams.get('page') ?? '1');
    const limit = parseInt(searchParams.get('limit') ?? '9');
    const search = searchParams.get('search') || '';
    const category = searchParams.get('category') || '';

    const initialFilters = useMemo(() => ({
        page,
        limit,
        search,
        category: category || undefined
    }), []);

    const {
        blogsData,
        blogLoading,
        fetchErrors,
        refetch,
        pagination,
        filters,
        setFilters
    } = useFetchBlogs(initialFilters);

    const { openModal, closeModal, isOpen, type, data } = useStore();

    const updateURLParams = (updates: Record<string, any>) => {
        const newParams = new URLSearchParams(searchParams);

        Object.entries(updates).forEach(([key, value]) => {
            if (value === '' || value === null || value === undefined || value === 'all') {
                newParams.delete(key);
            } else {
                newParams.set(key, value.toString());
            }
        });

        setSearchParams(newParams);
    };

    useEffect(() => {
        updateURLParams({
            page: filters.page,
            limit: filters.limit,
            search: filters.search,
            category: filters.category
        });
    }, [filters.page, filters.limit, filters.search, filters.category]);

    const handleSearch = (value: string) => {
        setFilters((prev: BlogFilters) => ({
            ...prev,
            page: 1,
            search: value
        }));
    };

    const handleCategoryFilter = (value: string) => {
        setFilters((prev: BlogFilters) => ({
            ...prev,
            page: 1,
            category: value || undefined
        }));
    };

    const handleItemsPerPageChange = (newLimit: string) => {
        setFilters((prev: BlogFilters) => ({
            ...prev,
            page: 1,
            limit: parseInt(newLimit)
        }));
    };

    const handlePageChange = (newPage: number) => {
        setFilters((prev: BlogFilters) => ({
            ...prev,
            page: newPage
        }));
    };

    const handleRefresh = () => {
        setFilters({
            page: 1,
            limit: 9,
            search: '',
            category: undefined
        });
        setSearchParams({});
    };

    const handleViewBlog = (blog: any) => {
        setSelectedBlog(blog);
    };

    const handleCloseView = () => {
        setSelectedBlog(null);
    };

    const handleChange = (field: string) => (value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const handleSelectChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const handleFileChange = (file: File | null) => {
        setImageFile(file);
        if (file) {
            setFormData(prev => ({ ...prev, image: file.name }));
            setErrors(prev => ({ ...prev, image: '' }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (type === 'create' && !imageFile) {
                setErrors(prev => ({ ...prev, image: 'Image is required' }));
                setLoading(false);
                return;
            }

            if (imageFile) {
                const imageError = validateImage(imageFile);
                if (imageError) {
                    setErrors(prev => ({ ...prev, image: imageError }));
                    setLoading(false);
                    return;
                }
            }

            const submitData = new FormData();
            submitData.append('title', formData.title);
            submitData.append('description', formData.description);
            submitData.append('author', formData.author);
            submitData.append('category', formData.category);
            submitData.append('readTime', formData.readTime);

            if (formData.badge) {
                submitData.append('badge', formData.badge);
            }

            if (imageFile) {
                submitData.append('image', imageFile);
            }

            let response;
            if (type === 'create') {
                response = await createBlog(submitData);
                handleSuccess(response.message || 'Blog created successfully');
            } else if (type === 'edit' && data?._id) {
                response = await updateBlog(data._id, submitData);
                handleSuccess(response.message || 'Blog updated successfully');
            }

            await refetch();
            resetForm();
            closeModal();

        } catch (err: any) {
            if (err instanceof ZodError) {
                const fieldErrors: Record<string, string> = {};
                err.issues.forEach((issue) => {
                    if (issue.path[0]) {
                        fieldErrors[issue.path[0].toString()] = issue.message;
                    }
                });
                setErrors(fieldErrors);
            } else {
                const errorMessage = err?.response?.data?.message || 'Failed to process blog';
                handleError(errorMessage);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!data?._id) {
            handleError('No blog selected for deletion');
            return;
        }

        try {
            setDeleteLoading(true);
            const res = await deleteBlogById(data._id);
            handleSuccess(res.message || 'Blog deleted successfully');
            await refetch();
            closeModal();
        } catch (err: any) {
            console.error('Delete error:', err);
            handleError(err.response?.data?.message || 'Failed to delete blog');
        } finally {
            setDeleteLoading(false);
        }
    };

    const resetForm = () => {
        setFormData({
            title: '',
            description: '',
            author: '',
            category: '',
            readTime: '',
            badge: '',
            image: ''
        });
        setImageFile(null);
        setErrors({});
    };

    useEffect(() => {
        if (type === 'edit' && data) {
            setFormData({
                title: data.title || '',
                description: data.description || '',
                author: data.author || '',
                category: data.category || '',
                readTime: data.readTime || '',
                badge: data.badge || '',
                image: data.image || ''
            });
            setImageFile(null);
        } else if (type === 'create') {
            resetForm();
        }
    }, [type, isOpen, data]);

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Blog Management</h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        {pagination ? `Total ${pagination.totalItems} blogs` : 'Manage platform blogs'}
                        {filters.category && ` in ${getCategoryLabel(filters.category)}`}
                        {filters.search && ` matching "${filters.search}"`}
                    </p>
                </div>
                <Button onClick={() => openModal('create')}>
                    Write New Blog
                </Button>
            </div>

            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 w-full">
                <div className='flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center w-full lg:w-auto'>
                    <div className="w-full sm:w-auto">
                        <InputField
                            placeholder="Search blogs by title, author, category, or tags..."
                            value={filters.search || ''}
                            onChange={handleSearch}
                            className="w-full sm:w-96"
                            label="Search blogs"
                        />
                    </div>

                    <div className="w-full sm:w-auto">
                        <SelectField
                            value={filters.category || ''}
                            onChange={handleCategoryFilter}
                            options={[{ value: '', label: 'All Categories' }, ...categoryOptions]}
                            className="w-full sm:w-64"
                            label="All Categories"
                        />
                    </div>

                    <div className="w-full sm:w-auto">
                        <SelectField
                            value={filters.limit?.toString() || '9'}
                            onChange={handleItemsPerPageChange}
                            options={itemsPerPageOptions}
                            className="w-full sm:w-64"
                            label="Items per page"
                        />
                    </div>
                </div>

                <div>
                    <span className="block text-sm font-medium text-gray-700 mb-1">Clear Filters</span>
                    <Button
                        variant="outline"
                        onClick={handleRefresh}
                        disabled={blogLoading}
                    >
                        <FiRefreshCw className={`w-4 h-4 ${blogLoading ? 'animate-spin' : ''}`} />
                        <span> Clear Filters</span>
                    </Button>
                </div>
            </div>

            <BlogGrid
                blogs={blogsData}
                loading={blogLoading}
                error={fetchErrors}
                onRetry={refetch}
                onEdit={(blog) => openModal('edit', blog)}
                onDelete={(blog) => openModal('delete', blog)}
                onView={handleViewBlog}
            />

            <PaginationWrapper
                pagination={pagination}
                handlePageChange={handlePageChange}
                loading={blogLoading}
            />

            <BlogFormModal
                isOpen={isOpen && ['create', 'edit'].includes(type)}
                type={type as 'create' | 'edit'}
                data={data}
                loading={loading}
                formData={formData}
                errors={errors}
                onClose={closeModal}
                onChange={handleChange}
                onSelectChange={handleSelectChange}
                onFileChange={handleFileChange}
                onSubmit={handleSubmit}
                categoryOptions={categoryOptions}
                badgeOptions={badgeOptions}
            />

            <DeleteModal
                isOpen={isOpen && type === 'delete'}
                isLoading={deleteLoading}
                itemName={data?.title || 'this blog'}
                onClose={closeModal}
                onDelete={handleDelete}
            />

            <BlogViewModal
                blog={selectedBlog}
                isOpen={!!selectedBlog}
                onClose={handleCloseView}
            />
        </div>
    );
};