import React, { useState } from 'react';
import Modal from './Modal';
import { FiCalendar, FiClock, FiUser, FiEye, FiTag, FiGlobe, FiCopy, FiCheck } from 'react-icons/fi';
import { getCategoryLabel, getBadgeLabel } from '../../constants';
import { formatDate, getBadgeColor, getCategoryColor, getReadTimeNumber } from '../../utils';
import Button from './Button';
import { FaRegCopy } from "react-icons/fa6";
import { handleError, handleSuccess } from '../../utils/toastHandler';

interface BlogViewModalProps {
    blog: any;
    isOpen: boolean;
    onClose: () => void;
}

const BlogViewModal: React.FC<BlogViewModalProps> = ({ blog, isOpen, onClose }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            handleSuccess("Link copied to clipboard!");
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            handleError("Failed to copy link");
        }
    };

    if (!blog) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose} title='Blog Details' size='lg'>
            <div className="max-h-[75vh] overflow-y-auto">

                <div className="relative mb-6 rounded-xl overflow-hidden">
                    <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-full h-80 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                        <div className="text-white">
                            <div className="flex flex-wrap items-center gap-4 text-sm">
                                <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                                    <FiUser size={14} />
                                    <span className="font-medium">By {blog.author}</span>
                                </div>
                                <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                                    <FiCalendar size={14} />
                                    <span>{formatDate(blog.createdAt)}</span>
                                </div>
                                <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                                    <FiClock size={14} />
                                    <span>{getReadTimeNumber(blog.readTime)} min read</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Badge, Category and Status */}
                <div className="flex flex-wrap items-center gap-3 mb-6 px-2">
                    {blog.badge && (
                        <span className={`px-4 py-2 text-sm font-semibold rounded-full border ${getBadgeColor(blog.badge)}`}>
                            {getBadgeLabel(blog.badge)}
                        </span>
                    )}
                    <span className={`px-4 py-2 text-sm font-semibold rounded-full border ${getCategoryColor(blog.category)}`}>
                        {getCategoryLabel(blog.category)}
                    </span>
                    <span className={`px-4 py-2 text-sm font-semibold rounded-full ${blog.isPublished
                        ? 'bg-green-100 text-green-800 border border-green-200'
                        : 'bg-gray-100 text-gray-600 border border-gray-200'
                        }`}>
                        {blog.isPublished ? '📢 Published' : '📝 Draft'}
                    </span>
                </div>

                {/* Description */}
                <div className="mb-8 px-2">
                    <div className="prose max-w-none">
                        <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-line">
                            {blog.description}
                        </p>
                    </div>
                </div>

                {/* Tags Section */}
                {blog.tags && blog.tags.length > 0 && (
                    <div className="mb-8 px-2">
                        <div className="flex items-center space-x-2 mb-3">
                            <FiTag className="text-gray-600" size={18} />
                            <h3 className="text-lg font-semibold text-gray-900">Tags</h3>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {blog.tags.map((tag: string, index: number) => (
                                <span
                                    key={index}
                                    className="px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 text-sm font-medium rounded-lg border border-blue-200 hover:shadow-md transition-shadow duration-200"
                                >
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* SEO Information */}
                {blog.seo && (
                    <div className="mb-8 px-2">
                        <div className="flex items-center space-x-2 mb-4">
                            <FiGlobe className="text-gray-600" size={18} />
                            <h3 className="text-lg font-semibold text-gray-900">SEO Information</h3>
                        </div>
                        <div className="space-y-4 bg-gray-50 rounded-xl p-6 border border-gray-200">
                            {/* Meta Title */}
                            <div>
                                <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
                                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                                    Meta Title
                                </h4>
                                <p className="text-gray-800 bg-white p-3 rounded-lg border border-gray-300 text-sm">
                                    {blog.seo.metaTitle}
                                </p>
                            </div>

                            {/* Meta Description */}
                            <div>
                                <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
                                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                                    Meta Description
                                </h4>
                                <p className="text-gray-800 bg-white p-3 rounded-lg border border-gray-300 text-sm leading-relaxed">
                                    {blog.seo.metaDescription}
                                </p>
                            </div>

                            {/* Keywords */}
                            {blog.seo.keywords && blog.seo.keywords.length > 0 && (
                                <div>
                                    <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
                                        <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                                        Keywords
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {blog.seo.keywords.map((keyword: string, index: number) => (
                                            <span
                                                key={index}
                                                className="px-3 py-1 bg-white text-gray-700 text-xs font-medium rounded-md border border-gray-300 hover:shadow-sm transition-shadow"
                                            >
                                                {keyword}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Technical Details */}
                <div className="px-2">
                    <div className="border-t pt-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Technical Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Left Column */}
                            <div className="space-y-4">
                                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                                    <span className="text-sm font-medium text-gray-600">Blog ID</span>
                                    <span className="text-sm text-gray-800 font-mono bg-gray-100 px-2 py-1 rounded">
                                        {blog._id}
                                    </span>
                                </div>
                                <div className="flex-col space-y-2 justify-between items-center py-2 border-b border-gray-200">
                                    <span className="text-sm font-medium text-gray-600">Slug</span>
                                    <span className="text-sm text-gray-800 line-clamp-2 font-mono bg-gray-100 px-2 py-1 rounded">
                                        {blog.slug}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                                    <span className="text-sm font-medium text-gray-600">Read Time</span>
                                    <span className="text-sm text-gray-800">{blog.readTime}</span>
                                </div>
                            </div>

                            {/* Right Column */}
                            <div className="space-y-4">
                                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                                    <span className="text-sm font-medium text-gray-600">Created</span>
                                    <span className="text-sm text-gray-800">{formatDate(blog.createdAt)}</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                                    <span className="text-sm font-medium text-gray-600">Last Updated</span>
                                    <span className="text-sm text-gray-800">{formatDate(blog.updatedAt)}</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                                    <span className="text-sm font-medium text-gray-600">Status</span>
                                    <span className={`text-sm font-medium ${blog.isPublished ? 'text-green-600' : 'text-gray-600'
                                        }`}>
                                        {blog.isPublished ? 'Published' : 'Draft'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions Footer */}
                <div className="mt-8 px-2">
                    <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-4 border border-gray-200">
                        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                            <div className="flex items-center space-x-2 text-sm text-gray-600">
                                <FiEye size={16} />
                                <span>Viewing blog details</span>
                            </div>
                            <div className="flex space-x-3">
                                <Button variant='outline' onClick={onClose}>
                                    Close
                                </Button>
                                <Button onClick={handleCopy}>
                                    {copied ? (
                                        <FiCheck className="w-5 h-5  text-green-600" />
                                    ) : (
                                        <FiCopy className="w-4 h-4 " />
                                    )}
                                    <span>{copied ? 'Copied!' : 'Copy Link'}</span>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default BlogViewModal;