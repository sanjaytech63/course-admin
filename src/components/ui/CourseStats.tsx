import React from "react";
import { useCourseStats } from "../../hooks/useCourseStats";
import { getCategoryLabel } from "../../constants";
import { ErrorState } from "./ErrorState";
import { EmptyState } from "./EmptyState";
import {
  FiUsers,
  FiStar,
  FiDollarSign,
  FiBook,
  FiTrendingUp,
  FiAward,
} from "react-icons/fi";

export const CourseStats: React.FC = () => {
  const { stats, loading, error, refetch } = useCourseStats();

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-20 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return <ErrorState onRetry={refetch} error={error} />;
  }

  if (!stats) {
    return <EmptyState title="No course statistics found" />;
  }

  const { overview, byCategory } = stats;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">
        Course Statistics
      </h2>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Courses */}
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-blue-600">
                {overview.totalCourses}
              </div>
              <div className="text-sm text-blue-800 font-medium">
                Total Courses
              </div>
              <div className="text-xs text-blue-600 mt-1">All courses</div>
            </div>
            <FiBook className="w-8 h-8 text-blue-500 opacity-70" />
          </div>
        </div>

        {/* Active Courses */}
        <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-green-600">
                {overview.activeCourses}
              </div>
              <div className="text-sm text-green-800 font-medium">
                Active Courses
              </div>
              <div className="text-xs text-green-600 mt-1">
                Currently available
              </div>
            </div>
            <FiTrendingUp className="w-8 h-8 text-green-500 opacity-70" />
          </div>
        </div>

        {/* Featured Courses */}
        <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg p-4 border border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-purple-600">
                {overview.featuredCourses}
              </div>
              <div className="text-sm text-purple-800 font-medium">
                Featured
              </div>
              <div className="text-xs text-purple-600 mt-1">
                Highlighted courses
              </div>
            </div>
            <FiAward className="w-8 h-8 text-purple-500 opacity-70" />
          </div>
        </div>

        {/* Total Students */}
        <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg p-4 border border-orange-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-orange-600">
                {overview.totalStudents}
              </div>
              <div className="text-sm text-orange-800 font-medium">
                Total Students
              </div>
              <div className="text-xs text-orange-600 mt-1">
                All enrollments
              </div>
            </div>
            <FiUsers className="w-8 h-8 text-orange-500 opacity-70" />
          </div>
        </div>
      </div>

      {/* Second Row Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Average Rating */}
        <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg p-4 border border-yellow-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-yellow-600">
                {overview.avgRating != null ? overview.avgRating.toFixed(1) : "N/A"}
              </div>
              <div className="text-sm text-yellow-800 font-medium">
                Avg Rating
              </div>
              <div className="text-xs text-yellow-600 mt-1">Out of 5.0</div>
            </div>
            <FiStar className="w-8 h-8 text-yellow-500 opacity-70" />
          </div>
        </div>

        {/* Average Price */}
        <div className="bg-gradient-to-r from-indigo-50 to-indigo-100 rounded-lg p-4 border border-indigo-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-indigo-600">
                ₹ {overview.avgPrice != null ? overview.avgPrice.toFixed(2) : "N/A"}
              </div>
              <div className="text-sm text-indigo-800 font-medium">
                Avg Price
              </div>
              <div className="text-xs text-indigo-600 mt-1">Per course</div>
            </div>
            <FiDollarSign className="w-8 h-8 text-indigo-500 opacity-70" />
          </div>
        </div>

        {/* Total Revenue */}
        <div className="bg-gradient-to-r from-emerald-50 to-emerald-100 rounded-lg p-4 border border-emerald-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-emerald-600">
                ₹ {overview.totalRevenue}
              </div>
              <div className="text-sm text-emerald-800 font-medium">
                Total Revenue
              </div>
              <div className="text-xs text-emerald-600 mt-1">
                Estimated total
              </div>
            </div>
            <FiTrendingUp className="w-8 h-8 text-emerald-500 opacity-70" />
          </div>
        </div>
      </div>

      {/* Category Distribution */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Category Distribution
        </h3>
        <div className="space-y-3">
          {byCategory.map((categoryStat) => {
            const percentage =
              (categoryStat.courseCount / overview.totalCourses) * 100;
            return (
              <div
                key={categoryStat._id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center space-x-3 flex-1">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span className="font-medium text-gray-700 flex-1">
                    {getCategoryLabel(categoryStat._id)}
                  </span>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span>{categoryStat.courseCount ?? 0} courses</span>
                  <span>⭐ {categoryStat.avgRating != null ? categoryStat.avgRating.toFixed(1) : "N/A"}</span>
                  <span>👥 {categoryStat.totalStudents ?? 0}</span>
                  <span>💰 ₹ {categoryStat.avgPrice != null ? categoryStat.avgPrice.toFixed(2) : "0.00"}</span>
                </div>

                <div className="w-24 bg-gray-200 rounded-full h-2 ml-4">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                    style={{
                      width: `${percentage}%`,
                    }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Summary */}
      <div className="mt-6 p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg border border-gray-200">
        <div className="text-sm text-gray-600 text-center">
          <span className="font-semibold text-gray-700">
            {overview.categoriesCount} categories
          </span>{" "}
          with {overview.totalCourses} total courses serving{" "}
          {overview.totalStudents} students
        </div>
      </div>
    </div>
  );
};
