import React, { useState } from 'react';
import { useStore } from '../store/store';
import Button from '../components/ui/Button';
import InputField from '../components/ui/InputField';
import BlogGrid from '../components/ui/BlogGrid';
import BlogFormModal from '../components/ui/BlogFormModal';
import DeleteModal from '../components/ui/DeleteModal';

export const Blogs: React.FC = () => {
    const { blogs, openModal, closeModal, deleteBlog, isOpen, type, data } = useStore();
    const [searchTerm, setSearchTerm] = useState('');

    const filteredBlogs = blogs.filter(
        blog =>
            blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            blog.author.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Blogs</h1>
                    <p className="text-gray-600">Manage platform blogs</p>
                </div>
                <Button onClick={() => openModal('create')}>Write Blog</Button>
            </div>

            <InputField
                placeholder="Search blogs..."
                value={searchTerm}
                onChange={(value) => setSearchTerm(value)}
                className="sm:max-w-xs"
            />

            <BlogGrid
                blogs={filteredBlogs}
                onEdit={(blog) => openModal('edit', blog)}
                onDelete={(blog) => openModal('delete', blog)}
            />

            {['create', 'edit',].includes(type) && (
                <BlogFormModal
                    isOpen={isOpen}
                    type={type as 'create' | 'edit'}
                    data={data}
                    onClose={closeModal}
                    onSubmit={(form) => console.log('Submit blog', form)}
                />
            )}

            {type === 'delete' && (
                <DeleteModal
                    isOpen={isOpen}
                    itemName={data?.title || ''}
                    onClose={closeModal}
                    onDelete={() => {
                        deleteBlog(data.id);
                        closeModal();
                    }}
                />
            )}
        </div>
    );
};
