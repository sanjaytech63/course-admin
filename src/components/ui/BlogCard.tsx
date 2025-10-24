import React from 'react';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import Button from './Button';
import { Card } from './Card';

interface BlogCardProps {
    blog: {
        id: string;
        title: string;
        author: string;
        category: string;
        createdAt: string;
        status: string;
        views: number;
    };
    onEdit: (blog: any) => void;
    onDelete: (blog: any) => void;
}

const BlogCard: React.FC<BlogCardProps> = ({ blog, onEdit, onDelete }) => {
    return (
        <Card
           
            padding="md"
            className="flex flex-col justify-between"
            footer={
                <div className="flex justify-between items-center">
                    <span className="text-gray-500 text-sm">{blog.views} views</span>
                    <div className="flex space-x-2">
                        <Button size="small" onClick={() => onEdit(blog)}>
                            <FiEdit2 size={16} />
                        </Button>
                        <Button size="small" onClick={() => onDelete(blog)}>
                            <FiTrash2 size={16} />
                        </Button>
                    </div>
                </div>
            }
        >
            <div className="space-y-2">
                <h2 className="text-lg font-semibold text-gray-900">{blog.title}</h2>
                <p className="text-gray-500 text-sm">
                    By <strong>{blog.author}</strong> • {blog.category} •{' '}
                    {new Date(blog.createdAt).toLocaleDateString()}
                </p>
                <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${blog.status === 'published'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                >
                    {blog.status}
                </span>
            </div>
        </Card>
    );
};

export default BlogCard;
