import React from 'react';
import { useBlogStats } from '../../hooks/useBlogStats';
import { getCategoryLabel } from '../../constants';
import { ErrorState } from './ErrorState';
import { EmptyState } from './EmptyState';
export const BlogStats: React.FC = () => {
    const { stats, loading, error, refetch } = useBlogStats();

    if (loading) {
        return (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="animate-pulse">
                    <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="h-20 bg-gray-200 rounded"></div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <ErrorState
                onRetry={refetch}
                error={error}
            />
        );
    }

    if (!stats) {
        return (
            <EmptyState
                title="No stats found"
            />
        );
    }

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Blog Statistics</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
                    <div className="text-2xl font-bold text-blue-600">{stats.overview.totalBlogs}</div>
                    <div className="text-sm text-blue-800 font-medium">Total Blogs</div>
                    <div className="text-xs text-blue-600 mt-1">Published articles</div>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
                    <div className="text-2xl font-bold text-green-600">{stats.overview.featuredBlogs}</div>
                    <div className="text-sm text-green-800 font-medium">Featured Blogs</div>
                    <div className="text-xs text-green-600 mt-1">Popular & trending</div>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg p-4 border border-purple-200">
                    <div className="text-2xl font-bold text-purple-600">{stats.categories.length}</div>
                    <div className="text-sm text-purple-800 font-medium">Categories</div>
                    <div className="text-xs text-purple-600 mt-1">Active categories</div>
                </div>
            </div>

            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Category Distribution</h3>
                <div className="space-y-3">
                    {stats.categories.map((categoryStat, index) => (
                        <div key={categoryStat.category} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center space-x-3">
                                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                                <span className="font-medium text-gray-700">
                                    {getCategoryLabel(categoryStat.category)}
                                </span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className="text-sm text-gray-500">{categoryStat.count} blogs</span>
                                <div className="w-20 bg-gray-200 rounded-full h-2">
                                    <div
                                        className="bg-blue-500 h-2 rounded-full"
                                        style={{
                                            width: `${(categoryStat.count / stats.overview.totalBlogs) * 100}%`
                                        }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};