import React from "react";
import { FiUsers, FiBook, FiFileText, FiDollarSign } from "react-icons/fi";
import { StatsCard } from "../components/dashboard/StatsCard";
import { RecentActivity } from "../components/dashboard/RecentActivity";
import { Card } from "../components/ui/Card";
import { useFetch } from "../hooks/useFetch";
import { BlogStats } from "../components/ui/BlogStats";
import { useBlogStats } from "../hooks/useBlogStats";
import { CourseStats } from "../components/ui/CourseStats";
import { useCourseStats } from "../hooks/useCourseStats";

export const Dashboard: React.FC = () => {
  const { users } = useFetch();
  const { stats } = useBlogStats();
  const { stats: coursestats } = useCourseStats();

  const userCount = users?.length;
  const blogCount = stats?.overview?.totalBlogs;
  const crouseCount = coursestats?.overview?.totalCourses;
  const totalRevenue = coursestats?.overview?.totalRevenue;

  const statsItem = [
    {
      title: "Users",
      value: userCount,
      icon: <FiUsers size={24} />,
      trend: { value: 12, isPositive: true },
    },
    {
      title: "Courses",
      value: crouseCount,
      icon: <FiBook size={24} />,
      trend: { value: 8, isPositive: true },
    },
    {
      title: "Blogs",
      value: blogCount,
      icon: <FiFileText size={24} />,
      trend: { value: 5, isPositive: true },
    },
    {
      title: "Revenue",
      value: totalRevenue,
      icon: <FiDollarSign size={24} />,
      trend: { value: 15, isPositive: true },
    },
  ];

  return (
    <div className="space-y-6">
      {/* <div>
                <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-gray-600">Welcome to your course admin dashboard</p>
            </div> */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsItem.map((stat, index) => (
          <StatsCard
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            trend={stat.trend}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Revenue Overview" padding="lg">
          <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">
              Chart will be implemented with Recharts
            </p>
          </div>
        </Card>

        <RecentActivity />
      </div>

      <BlogStats />

      <CourseStats />

      <Card title="Quick Actions" padding="lg">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="p-4 bg-primary-50 rounded-lg text-primary-700 hover:bg-primary-100 transition-colors text-center">
            <FiUsers className="mx-auto mb-2" size={24} />
            <span className="text-sm font-medium">Add User</span>
          </button>
          <button className="p-4 bg-green-50 rounded-lg text-green-700 hover:bg-green-100 transition-colors text-center">
            <FiBook className="mx-auto mb-2" size={24} />
            <span className="text-sm font-medium">Create Course</span>
          </button>
          <button className="p-4 bg-blue-50 rounded-lg text-blue-700 hover:bg-blue-100 transition-colors text-center">
            <FiFileText className="mx-auto mb-2" size={24} />
            <span className="text-sm font-medium">Write Blog</span>
          </button>
          <button className="p-4 bg-purple-50 rounded-lg text-purple-700 hover:bg-purple-100 transition-colors text-center">
            <FiDollarSign className="mx-auto mb-2" size={24} />
            <span className="text-sm font-medium">View Reports</span>
          </button>
        </div>
      </Card>
    </div>
  );
};
