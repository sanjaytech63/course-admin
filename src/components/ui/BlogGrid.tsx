import React from 'react';
import BlogCard from './BlogCard';

interface BlogGridProps {
    blogs: any[];
    onEdit: (blog: any) => void;
    onDelete: (blog: any) => void;
}

const BlogGrid: React.FC<BlogGridProps> = ({ blogs, onEdit, onDelete }) => {
    if (blogs.length === 0) {
        return <p className="text-gray-500">No blogs found.</p>;
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map(blog => (
                <BlogCard key={blog.id} blog={blog} onEdit={onEdit} onDelete={onDelete} />
            ))}
        </div>
    );
};

export default BlogGrid;
