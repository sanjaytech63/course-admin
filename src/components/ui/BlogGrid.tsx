import React from 'react';
import BlogCard from './BlogCard';
import { EmptyState } from './EmptyState';
import Loader from './Loader';
import { ErrorState } from './ErrorState';

interface BlogGridProps {
    blogs: any[];
    onEdit: (blog: any) => void;
    onDelete: (blog: any) => void;
    onView?: (blog: any) => void;
    loading?: boolean;
    error?: string | null;
    onRetry?: () => void;
}

const BlogGrid: React.FC<BlogGridProps> = ({
    blogs,
    onEdit,
    onDelete,
    onView,
    loading,
    error,
    onRetry
}) => {

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-96">
                <div className="text-center">
                    <Loader size="medium" label="Loading blogs..." />
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <ErrorState
                onRetry={onRetry}
                error={error}
            />
        );
    }

    if (!blogs) {
        return (
            <EmptyState
                title="No blogs found"
            />
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 gap-6">
            {blogs && blogs?.map(blog => (
                <BlogCard
                    key={blog._id}
                    blog={blog}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onView={onView}
                />
            ))}
        </div>
    );
};

export default BlogGrid;