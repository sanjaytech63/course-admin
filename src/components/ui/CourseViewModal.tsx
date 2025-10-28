import React, { useState } from 'react';
import Modal from './Modal';
import {
    FiCalendar,
    FiClock,
    FiUser,
    FiEye,
    FiTag,
    FiDollarSign,
    FiStar,
    FiUsers,
    FiBook,
    FiCopy,
    FiCheck,
    FiAward,
    FiBarChart2
} from 'react-icons/fi';
import { getCategoryLabel, getBadgeLabel, getLevelLabel } from '../../constants';
import { formatDate, getBadgeColor, getCategoryColor, getLevelColor } from '../../utils';
import Button from './Button';
import { handleError, handleSuccess } from '../../utils/toastHandler';

interface CourseViewModalProps {
    course: any;
    isOpen: boolean;
    onClose: () => void;
}

const CourseViewModal: React.FC<CourseViewModalProps> = ({ course, isOpen, onClose }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            handleSuccess("Course link copied to clipboard!");
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            handleError("Failed to copy link");
        }
    };

    if (!course) return null;

    const hasDiscount = course.discountedPrice && course.discountedPrice < course.originalPrice;
    const discountPercentage = hasDiscount
        ? Math.round(((course.originalPrice - course.discountedPrice) / course.originalPrice) * 100)
        : 0;

    return (
        <Modal isOpen={isOpen} onClose={onClose} title='Course Details' size='lg'>
            <div className="max-h-[75vh] overflow-y-auto">
                {/* Course Image Header */}
                <div className="relative mb-6 rounded-xl overflow-hidden">
                    <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-80 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                        <div className="text-white">
                            <h1 className="text-2xl font-bold mb-2">{course.title}</h1>
                            <div className="flex flex-wrap items-center gap-4 text-sm">
                                <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                                    <FiUser size={14} />
                                    <span className="font-medium">By {course.instructor}</span>
                                </div>
                                <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                                    <FiCalendar size={14} />
                                    <span>{formatDate(course.createdAt)}</span>
                                </div>
                                <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                                    <FiClock size={14} />
                                    <span>{course.totalHours} hours</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Badge, Category and Level */}
                <div className="flex flex-wrap items-center gap-3 mb-6 px-2">
                    {course.badge && (
                        <span className={`px-4 py-2 text-sm font-semibold rounded-full border ${getBadgeColor(course.badge)}`}>
                            {getBadgeLabel(course.badge)}
                        </span>
                    )}
                    <span className={`px-4 py-2 text-sm font-semibold rounded-full border ${getCategoryColor(course.category)}`}>
                        {getCategoryLabel(course.category)}
                    </span>
                    <span className={`px-4 py-2 text-sm font-semibold rounded-full border ${getLevelColor(course.level)}`}>
                        {getLevelLabel(course.level)}
                    </span>
                    <span className={`px-4 py-2 text-sm font-semibold rounded-full ${course.isFeatured
                        ? 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                        : 'bg-gray-100 text-gray-600 border border-gray-200'
                        }`}>
                        {course.isFeatured ? '⭐ Featured' : 'Standard'}
                    </span>
                    <span className={`px-4 py-2 text-sm font-semibold rounded-full ${course.isActive
                        ? 'bg-green-100 text-green-800 border border-green-200'
                        : 'bg-red-100 text-red-800 border border-red-200'
                        }`}>
                        {course.isActive ? '✅ Active' : '❌ Inactive'}
                    </span>
                </div>

                {/* Description */}
                <div className="mb-8 px-2">
                    <div className="prose max-w-none">
                        <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-line">
                            {course.description}
                        </p>
                    </div>
                </div>

                {/* Pricing Section */}
                <div className="mb-8 px-2">
                    <div className="flex items-center space-x-2 mb-4">
                        <FiDollarSign className="text-gray-600" size={20} />
                        <h3 className="text-lg font-semibold text-gray-900">Pricing</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
                            <div className="text-2xl font-bold text-gray-900">
                                ${hasDiscount ? course.discountedPrice : course.originalPrice}
                            </div>
                            <div className="text-sm text-gray-600">Current Price</div>
                        </div>
                        {hasDiscount && (
                            <>
                                <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
                                    <div className="text-lg font-bold text-gray-500 line-through">
                                        ${course.originalPrice}
                                    </div>
                                    <div className="text-sm text-gray-600">Original Price</div>
                                </div>
                                <div className="bg-red-50 rounded-lg border border-red-200 p-4 text-center">
                                    <div className="text-xl font-bold text-red-700">
                                        {discountPercentage}% OFF
                                    </div>
                                    <div className="text-sm text-red-600">Discount</div>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* Course Stats */}
                <div className="mb-8 px-2">
                    <div className="flex items-center space-x-2 mb-4">
                        <FiBarChart2 className="text-gray-600" size={20} />
                        <h3 className="text-lg font-semibold text-gray-900">Course Statistics</h3>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
                            <div className="flex items-center justify-center space-x-2 mb-2">
                                <FiStar className="text-yellow-500" size={20} />
                                <span className="text-xl font-bold text-gray-900">{course.rating}</span>
                            </div>
                            <div className="text-sm text-gray-600">Rating</div>
                            <div className="text-xs text-gray-500">({course.reviewCount} reviews)</div>
                        </div>
                        <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
                            <div className="flex items-center justify-center space-x-2 mb-2">
                                <FiUsers className="text-blue-500" size={20} />
                                <span className="text-xl font-bold text-gray-900">{course.students}</span>
                            </div>
                            <div className="text-sm text-gray-600">Students</div>
                        </div>
                        <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
                            <div className="flex items-center justify-center space-x-2 mb-2">
                                <FiBook className="text-green-500" size={20} />
                                <span className="text-xl font-bold text-gray-900">{course.lectures}</span>
                            </div>
                            <div className="text-sm text-gray-600">Lectures</div>
                        </div>
                        <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
                            <div className="flex items-center justify-center space-x-2 mb-2">
                                <FiClock className="text-purple-500" size={20} />
                                <span className="text-xl font-bold text-gray-900">{course.totalHours}h</span>
                            </div>
                            <div className="text-sm text-gray-600">Duration</div>
                        </div>
                    </div>
                </div>

                {/* Course Details */}
                <div className="mb-8 px-2">
                    <div className="flex items-center space-x-2 mb-4">
                        <FiAward className="text-gray-600" size={20} />
                        <h3 className="text-lg font-semibold text-gray-900">Course Details</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 rounded-xl p-6 border border-gray-200">
                        <div className="space-y-4">
                            <div className="flex justify-between items-center py-2 border-b border-gray-200">
                                <span className="text-sm font-medium text-gray-600">Duration</span>
                                <span className="text-sm text-gray-800 font-medium">{course.duration}</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-gray-200">
                                <span className="text-sm font-medium text-gray-600">Level</span>
                                <span className={`text-sm font-medium px-3 py-1 rounded-full ${getLevelColor(course.level)}`}>
                                    {getLevelLabel(course.level)}
                                </span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-gray-200">
                                <span className="text-sm font-medium text-gray-600">Total Hours</span>
                                <span className="text-sm text-gray-800 font-medium">{course.totalHours} hours</span>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center py-2 border-b border-gray-200">
                                <span className="text-sm font-medium text-gray-600">Lectures</span>
                                <span className="text-sm text-gray-800 font-medium">{course.lectures}</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-gray-200">
                                <span className="text-sm font-medium text-gray-600">Category</span>
                                <span className={`text-sm font-medium px-3 py-1 rounded-full ${getCategoryColor(course.category)}`}>
                                    {getCategoryLabel(course.category)}
                                </span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-gray-200">
                                <span className="text-sm font-medium text-gray-600">Instructor</span>
                                <span className="text-sm text-gray-800 font-medium">{course.instructor}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tags Section */}
                {course.tags && course.tags.length > 0 && (
                    <div className="mb-8 px-2">
                        <div className="flex items-center space-x-2 mb-3">
                            <FiTag className="text-gray-600" size={18} />
                            <h3 className="text-lg font-semibold text-gray-900">Tags</h3>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {course.tags.map((tag: string, index: number) => (
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

                {/* Technical Details */}
                <div className="px-2">
                    <div className="border-t pt-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Technical Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Left Column */}
                            <div className="space-y-4">
                                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                                    <span className="text-sm font-medium text-gray-600">Course ID</span>
                                    <span className="text-sm text-gray-800 font-mono bg-gray-100 px-2 py-1 rounded">
                                        {course._id}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                                    <span className="text-sm font-medium text-gray-600">Created</span>
                                    <span className="text-sm text-gray-800">{formatDate(course.createdAt)}</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                                    <span className="text-sm font-medium text-gray-600">Featured</span>
                                    <span className={`text-sm font-medium ${course.isFeatured ? 'text-yellow-600' : 'text-gray-600'}`}>
                                        {course.isFeatured ? 'Yes' : 'No'}
                                    </span>
                                </div>
                            </div>

                            {/* Right Column */}
                            <div className="space-y-4">
                                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                                    <span className="text-sm font-medium text-gray-600">Last Updated</span>
                                    <span className="text-sm text-gray-800">{formatDate(course.updatedAt)}</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                                    <span className="text-sm font-medium text-gray-600">Status</span>
                                    <span className={`text-sm font-medium ${course.isActive ? 'text-green-600' : 'text-red-600'}`}>
                                        {course.isActive ? 'Active' : 'Inactive'}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                                    <span className="text-sm font-medium text-gray-600">Discount %</span>
                                    <span className="text-sm text-gray-800">{course.discountPercentage || 0}%</span>
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
                                <span>Viewing course details</span>
                            </div>
                            <div className="flex space-x-3">
                                <Button variant='outline' onClick={onClose}>
                                    Close
                                </Button>
                                <Button onClick={handleCopy}>
                                    {copied ? (
                                        <FiCheck className="w-5 h-5 text-green-600" />
                                    ) : (
                                        <FiCopy className="w-4 h-4" />
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

export default CourseViewModal;