import React from "react";
import {
  FiEdit2,
  FiTrash2,
  FiEye,
  FiClock,
  FiUser,
  FiCalendar,
} from "react-icons/fi";
import Button from "./Button";
import { Card } from "./Card";
import { getCategoryLabel, getBadgeLabel } from "../../constants";
import { BlogCardProps } from "../../types/blog.types";
import {
  formatDate,
  getBadgeColor,
  getCategoryColor,
  getReadTimeNumber,
} from "../../utils";

const BlogCard: React.FC<BlogCardProps> = ({
  blog,
  onEdit,
  onDelete,
  onView,
}) => {
  return (
    <Card padding="md">
      <div className="mb-4 overflow-hidden rounded-xl">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
      </div>

      {blog.badge && (
        <div className="mb-3">
          <span
            className={`inline-block px-3 py-1 text-xs font-semibold rounded-full border ${getBadgeColor(blog.badge)}`}
          >
            {getBadgeLabel(blog.badge)}
          </span>
        </div>
      )}

      <div className="flex-grow space-y-4 mb-4">
        <h2 className="text-xl font-bold text-gray-900 line-clamp-2 leading-tight group-hover:text-primary-600 transition-colors duration-200">
          {blog.title}
        </h2>

        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
          {blog.description}
        </p>

        {blog.tags && blog.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {blog.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-md"
              >
                #{tag}
              </span>
            ))}
            {blog.tags.length > 3 && (
              <span className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-md">
                +{blog.tags.length - 3}
              </span>
            )}
          </div>
        )}

        <div className="space-y-3 pt-2 border-t border-gray-100">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center text-sm text-gray-600">
              <FiUser className="mr-2" size={14} />
              <span className="font-medium capitalize">{blog.author}</span>
            </div>
            <span
              className={`px-3 py-1 text-xs font-medium rounded-full border ${getCategoryColor(blog.category)}`}
            >
              {getCategoryLabel(blog.category)}
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-gray-500">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <FiClock size={12} />
                <span>{getReadTimeNumber(blog.readTime)} min read</span>
              </div>
              <div className="flex items-center space-x-1">
                <FiCalendar size={12} />
                <span>{formatDate(blog.createdAt)}</span>
              </div>
            </div>

            {blog.updatedAt !== blog.createdAt && (
              <div className="text-xs text-gray-400">
                Updated {formatDate(blog.updatedAt)}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pt-4 border-t border-gray-100">
        <div className="flex items-center text-sm">
          <div
            className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs ${
              blog.isPublished
                ? "bg-green-100 text-green-700"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            <div
              className={`w-2 h-2 rounded-full ${
                blog.isPublished ? "bg-green-500" : "bg-gray-400"
              }`}
            ></div>
            <span>{blog.isPublished ? "Published" : "Draft"}</span>
          </div>
        </div>

        <div className="flex space-x-2 w-full sm:w-auto">
          {onView && (
            <Button
              size="small"
              variant="ghost"
              onClick={() => onView(blog)}
              className="flex-1 sm:flex-none flex items-center justify-center space-x-1"
            >
              <FiEye size={14} />
              <span className="hidden xs:inline">View</span>
            </Button>
          )}
          <Button
            size="small"
            variant="outline"
            onClick={() => onEdit(blog)}
            className="flex-1 sm:flex-none flex items-center justify-center space-x-1"
          >
            <FiEdit2 size={14} />
            <span className="hidden xs:inline">Edit</span>
          </Button>
          <Button
            size="small"
            variant="danger"
            onClick={() => onDelete(blog)}
            className="flex-1 sm:flex-none flex items-center justify-center space-x-1"
          >
            <FiTrash2 size={14} />
            <span className="hidden xs:inline">Delete</span>
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default BlogCard;
