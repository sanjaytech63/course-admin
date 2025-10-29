import React from "react";
import CourseCard from "./CourseCard";
import { EmptyState } from "./EmptyState";
import Loader from "./Loader";
import { ErrorState } from "./ErrorState";
import { CourseGridProps } from "../../types/course.types";

const CourseGrid: React.FC<CourseGridProps> = ({
  courses,
  onEdit,
  onDelete,
  onView,
  loading,
  error,
  onRetry,
}) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <div className="text-center">
          <Loader size="medium" label="Loading courses..." />
        </div>
      </div>
    );
  }

  if (error) {
    return <ErrorState onRetry={onRetry} error={error} />;
  }

  if (!courses) {
    return <EmptyState title="No courses found" />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
      {courses?.map((course) => (
        <CourseCard
          key={course._id}
          course={course}
          onEdit={onEdit}
          onDelete={onDelete}
          onView={onView}
        />
      ))}
    </div>
  );
};

export default CourseGrid;
