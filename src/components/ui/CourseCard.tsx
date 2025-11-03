import React from "react";
import {
  FiEdit2,
  FiTrash2,
  FiEye,
  FiClock,
  FiUsers,
  FiStar,
  FiDollarSign,
} from "react-icons/fi";
import Button from "./Button";
import { Card } from "./Card";
import { CourseCardProps } from "../../types/course.types";
import {
  getCategoryLabel,
  getLevelLabel,
  getBadgeLabel,
} from "../../constants/index";
import { getBadgeColor, getCategoryColor, getLevelColor } from "../../utils";

const CourseCard: React.FC<CourseCardProps> = ({
  course,
  onEdit,
  onDelete,
  onView,
}) => {
  // ✅ FIXED: Calculate discount percentage correctly
  const calculateDiscountPercentage = () => {
    if (course.discountedPrice && course.discountedPrice < course.originalPrice) {
      return Math.round(((course.originalPrice - course.discountedPrice) / course.originalPrice) * 100);
    }
    return 0;
  };

  const discountPercentage = calculateDiscountPercentage();
  const hasDiscount = discountPercentage > 0;

  // ✅ FIXED: Validate prices to prevent impossible scenarios
  const isValidPricing = course.discountedPrice 
    ? course.discountedPrice < course.originalPrice
    : true;

  return (
    <Card padding="md" className="h-full flex flex-col">
      <div className="mb-4 overflow-hidden rounded-xl relative">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-48 object-cover transition-transform duration-500 hover:scale-105"
          loading="lazy"
        />

        {course.badge && (
          <div className="absolute top-3 left-3">
            <span
              className={`inline-block px-3 py-1 text-xs font-semibold rounded-full border ${getBadgeColor(course.badge)}`}
            >
              {getBadgeLabel(course.badge)}
            </span>
          </div>
        )}

        {course.isFeatured && (
          <div className="absolute top-3 right-3">
            <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800 border border-yellow-200">
              Featured
            </span>
          </div>
        )}

        {/* ✅ ADDED: Warning badge for invalid pricing */}
        {!isValidPricing && (
          <div className="absolute bottom-3 left-3">
            <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800 border border-red-200">
              Invalid Pricing
            </span>
          </div>
        )}
      </div>

      <div className="flex-grow space-y-3 mb-4">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={`px-3 py-1 text-xs font-medium rounded-full border ${getCategoryColor(course.category)}`}
          >
            {getCategoryLabel(course.category)}
          </span>
          <span
            className={`px-3 py-1 text-xs font-medium rounded-full border ${getLevelColor(course.level)}`}
          >
            {getLevelLabel(course.level)}
          </span>
        </div>

        <h2 className="text-lg font-bold text-gray-900 line-clamp-2 leading-tight hover:text-primary-600 transition-colors duration-200">
          {course.title}
        </h2>

        <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
          {course.description}
        </p>

        <div className="flex items-center text-sm text-gray-600">
          <span className="font-medium">By {course.instructor}</span>
        </div>

        <div className="grid grid-cols-2 gap-3 text-xs text-gray-500">
          <div className="flex items-center space-x-1">
            <FiClock size={12} />
            <span>{course.totalHours}h</span>
          </div>
          <div className="flex items-center space-x-1">
            <FiUsers size={12} />
            <span>{course.students.toLocaleString()} students</span>
          </div>
          <div className="flex items-center space-x-1">
            <span>📚 {course.lectures} lectures</span>
          </div>
          <div className="flex items-center space-x-1">
            <FiStar size={12} className="text-yellow-500" />
            <span>
              {course.rating} ({course.reviewCount})
            </span>
          </div>
        </div>

        {course.tags && course.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {course.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-md"
              >
                {tag}
              </span>
            ))}
            {course.tags.length > 3 && (
              <span className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-md">
                +{course.tags.length - 3}
              </span>
            )}
          </div>
        )}

        {/* ✅ FIXED: Pricing display with validation */}
        <div className="flex items-center space-x-2">
          {hasDiscount && isValidPricing ? (
            <>
              <span className="text-lg font-bold text-gray-900">
                ₹{course.discountedPrice}
              </span>
              <span className="text-sm text-gray-500 line-through">
                ₹{course.originalPrice}
              </span>
              <span className="text-xs font-semibold text-red-600 bg-red-100 px-2 py-1 rounded">
                {discountPercentage}% OFF
              </span>
            </>
          ) : !isValidPricing ? (
            // Show warning for invalid pricing
            <div className="flex items-center space-x-2 text-orange-600 text-sm">
              <span>⚠️ Price Error</span>
              <span className="text-xs">₹{course.originalPrice}</span>
            </div>
          ) : (
            // Normal pricing without discount
            <span className="text-lg font-bold text-gray-900">
              ₹{course.originalPrice}
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pt-4 border-t border-gray-100">
        <div className="flex items-center text-sm">
          <div
            className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs ${
              course.isActive
                ? "bg-green-100 text-green-700"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            <div
              className={`w-2 h-2 rounded-full ${
                course.isActive ? "bg-green-500" : "bg-gray-400"
              }`}
            ></div>
            <span>{course.isActive ? "Active" : "Inactive"}</span>
          </div>
        </div>

        <div className="flex space-x-2 w-full sm:w-auto">
          {onView && (
            <Button
              size="small"
              variant="ghost"
              onClick={() => onView(course)}
              className="flex-1 sm:flex-none flex items-center justify-center space-x-1"
            >
              <FiEye size={14} />
              <span className="hidden xs:inline">View</span>
            </Button>
          )}
          <Button
            size="small"
            variant="outline"
            onClick={() => onEdit(course)}
            className="flex-1 sm:flex-none flex items-center justify-center space-x-1"
          >
            <FiEdit2 size={14} />
            <span className="hidden xs:inline">Edit</span>
          </Button>
          <Button
            size="small"
            variant="danger"
            onClick={() => onDelete(course)}
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

export default CourseCard;