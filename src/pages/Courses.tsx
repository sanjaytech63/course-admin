import React, { useEffect, useState, useMemo } from "react";
import { ZodError } from "zod";
import { validateImage } from "../validations/course.schema";
import { useStore } from "../store/store";
import Button from "../components/ui/Button";
import { useSearchParams } from "react-router-dom";
import InputField from "../components/ui/InputField";
import SelectField from "../components/ui/SelectField";
import CourseGrid from "../components/ui/CourseGrid";
import CourseFormModal from "../components/ui/CourseFormModal";
import DeleteModal from "../components/ui/DeleteModal";
import {
  createCourse,
  deleteCourseById,
  updateCourse,
} from "../api/course.service";
import { handleError, handleSuccess } from "../utils/toastHandler";
import { useFetchCourses } from "../hooks/useFetchCourses";
import { CourseFilters, CourseFormData } from "../types/course.types";
import PaginationWrapper from "../components/ui/PaginationWrapper";
import { FiRefreshCw, FiPlus } from "react-icons/fi";
import {
  badgeOptions,
  categoryOptions,
  getCategoryLabel,
  itemsPerPageOptions,
  levelOptions,
} from "../constants/index";
import BlogViewModal from "../components/ui/BlogViewModa";
import CourseViewModal from "../components/ui/CourseViewModal";

export const Courses: React.FC = () => {
  const [formData, setFormData] = useState<CourseFormData>({
    title: "",
    description: "",
    category: "",
    instructor: "",
    duration: "",
    originalPrice: 0,
    discountedPrice: undefined,
    discountPercentage: 0,
    rating: 0,
    reviewCount: 0,
    students: 0,
    totalHours: 0,
    lectures: 0,
    level: "beginner",
    badge: "",
    icon: "",
    iconType: "default",
    tags: "",
    isFeatured: false,
    isActive: true,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") ?? "1");
  const limit = parseInt(searchParams.get("limit") ?? "9");
  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "";
  const level = searchParams.get("level") || "";

  const initialFilters = useMemo(
    () => ({
      page,
      limit,
      search,
      category: category || undefined,
      level: level || undefined,
    }),
    [],
  );

  const {
    courses,
    loading: courseLoading,
    error: fetchErrors,
    refetch,
    pagination,
    filters,
    setFilters,
  } = useFetchCourses(initialFilters);

  const { openModal, closeModal, isOpen, type, data } = useStore();

  const updateURLParams = (updates: Record<string, any>) => {
    const newParams = new URLSearchParams(searchParams);

    Object.entries(updates).forEach(([key, value]) => {
      if (
        value === "" ||
        value === null ||
        value === undefined ||
        value === "all"
      ) {
        newParams.delete(key);
      } else {
        newParams.set(key, value.toString());
      }
    });

    setSearchParams(newParams);
  };

  useEffect(() => {
    updateURLParams({
      page: filters.page,
      limit: filters.limit,
      search: filters.search,
      category: filters.category,
      level: filters.level,
    });
  }, [
    filters.page,
    filters.limit,
    filters.search,
    filters.category,
    filters.level,
  ]);

  const handleSearch = (value: string) => {
    setFilters((prev: CourseFilters) => ({
      ...prev,
      page: 1,
      search: value,
    }));
  };

  const handleCategoryFilter = (value: string) => {
    setFilters((prev: CourseFilters) => ({
      ...prev,
      page: 1,
      category: value || undefined,
    }));
  };

  const handleLevelFilter = (value: string) => {
    setFilters((prev: CourseFilters) => ({
      ...prev,
      page: 1,
      level: value || undefined,
    }));
  };

  const handleItemsPerPageChange = (newLimit: string) => {
    setFilters((prev: CourseFilters) => ({
      ...prev,
      page: 1,
      limit: parseInt(newLimit),
    }));
  };

  const handlePageChange = (newPage: number) => {
    setFilters((prev: CourseFilters) => ({
      ...prev,
      page: newPage,
    }));
  };

  const handleRefresh = () => {
    setFilters({
      page: 1,
      limit: 9,
      search: "",
      category: undefined,
      level: undefined,
    });
    setSearchParams({});
  };

  const handleViewCourse = (course: any) => {
    setSelectedCourse(course);
  };

  const handleCloseView = () => {
    setSelectedCourse(null);
  };

  const handleChange = (field: string) => (value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleSelectChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleFileChange = (file: File | null) => {
    setImageFile(file);
    if (file) {
      setFormData((prev) => ({ ...prev, image: file.name }));
      setErrors((prev) => ({ ...prev, image: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (type === "create" && !imageFile) {
        setErrors((prev) => ({ ...prev, image: "Image is required" }));
        setLoading(false);
        return;
      }

      if (imageFile) {
        const imageError = validateImage(imageFile);
        if (imageError) {
          setErrors((prev) => ({ ...prev, image: imageError }));
          setLoading(false);
          return;
        }
      }

      const submitData = new FormData();

      // Append all form data
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          submitData.append(key, value.toString());
        }
      });

      if (formData.tags) {
        const tagsArray = formData.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag);
        submitData.set("tags", JSON.stringify(tagsArray));
      }

      if (imageFile) {
        submitData.append("image", imageFile);
      }

      let response;
      if (type === "create") {
        response = await createCourse(submitData);
        handleSuccess(response.message || "Course created successfully");
      } else if (type === "edit" && data?._id) {
        response = await updateCourse(data._id, submitData);
        handleSuccess(response.message || "Course updated successfully");
      }

      await refetch();
      resetForm();
      closeModal();
    } catch (err: any) {
      if (err instanceof ZodError) {
        const fieldErrors: Record<string, string> = {};
        err.issues.forEach((issue) => {
          if (issue.path[0]) {
            fieldErrors[issue.path[0].toString()] = issue.message;
          }
        });
        setErrors(fieldErrors);
      } else {
        const errorMessage =
          err?.response?.data?.message || "Failed to process course";
        handleError(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!data?._id) {
      handleError("No course selected for deletion");
      return;
    }

    try {
      setDeleteLoading(true);
      const res = await deleteCourseById(data._id);
      handleSuccess(res.message || "Course deleted successfully");
      await refetch();
      closeModal();
    } catch (err: any) {
      console.error("Delete error:", err);
      handleError(err.response?.data?.message || "Failed to delete course");
    } finally {
      setDeleteLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      category: "",
      instructor: "",
      duration: "",
      originalPrice: 0,
      discountedPrice: undefined,
      discountPercentage: 0,
      rating: 0,
      reviewCount: 0,
      students: 0,
      totalHours: 0,
      lectures: 0,
      level: "beginner",
      badge: "",
      icon: "",
      iconType: "default",
      tags: "",
      isFeatured: false,
      isActive: true,
    });
    setImageFile(null);
    setErrors({});
  };

  useEffect(() => {
    if (type === "edit" && data) {
      setFormData({
        title: data.title || "",
        description: data.description || "",
        category: data.category || "",
        instructor: data.instructor || "",
        duration: data.duration || "",
        originalPrice: data.originalPrice || 0,
        discountedPrice: data.discountedPrice || undefined,
        discountPercentage: data.discountPercentage || 0,
        rating: data.rating || 0,
        reviewCount: data.reviewCount || 0,
        students: data.students || 0,
        totalHours: data.totalHours || 0,
        lectures: data.lectures || 0,
        level: data.level || "beginner",
        badge: data.badge || "",
        icon: data.icon || "",
        iconType: data.iconType || "default",
        tags: data.tags?.join(", ") || "",
        isFeatured: data.isFeatured || false,
        isActive: data.isActive !== false,
      });
      setImageFile(null);
    } else if (type === "create") {
      resetForm();
    }
  }, [type, isOpen, data]);

  console.log(selectedCourse, "selectedCourse");

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Course Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {pagination
              ? `Total ${pagination.totalItems} courses`
              : "Manage platform courses"}
            {filters.category && ` in ${getCategoryLabel(filters.category)}`}
            {filters.search && ` matching "${filters.search}"`}
          </p>
        </div>
        <Button onClick={() => openModal("create")}>
          <FiPlus className="mr-2" size={16} />
          Create New Course
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 w-full">
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center w-full lg:w-auto">
          <div className="w-full sm:w-auto">
            <InputField
              placeholder="Search courses by title, instructor, or category..."
              value={filters.search || ""}
              onChange={handleSearch}
              className="w-full sm:w-96"
              label="Search courses"
            />
          </div>

          <div className="w-full sm:w-auto">
            <SelectField
              value={filters.category || ""}
              onChange={handleCategoryFilter}
              options={[
                { value: "", label: "All Categories" },
                ...categoryOptions,
              ]}
              className="w-full sm:w-48"
              label="Category"
            />
          </div>

          <div className="w-full sm:w-auto">
            <SelectField
              value={filters.level || ""}
              onChange={handleLevelFilter}
              options={[{ value: "", label: "All Levels" }, ...levelOptions]}
              className="w-full sm:w-48"
              label="Level"
            />
          </div>

          <div className="w-full sm:w-auto">
            <SelectField
              value={filters.limit?.toString() || "9"}
              onChange={handleItemsPerPageChange}
              options={itemsPerPageOptions}
              className="w-full sm:w-48"
              label="Items per page"
            />
          </div>
        </div>

        <div>
          <span className="block text-sm font-medium text-gray-700 mb-1">
            Clear Filters
          </span>
          <Button
            variant="outline"
            onClick={handleRefresh}
            disabled={courseLoading}
          >
            <FiRefreshCw
              className={`w-4 h-4 ${courseLoading ? "animate-spin" : ""}`}
            />
            <span> Clear Filters</span>
          </Button>
        </div>
      </div>

      <CourseGrid
        courses={courses}
        loading={courseLoading}
        error={fetchErrors}
        onRetry={refetch}
        onEdit={(course) => openModal("edit", course)}
        onDelete={(course) => openModal("delete", course)}
        onView={handleViewCourse}
      />

      <CourseViewModal
        course={selectedCourse}
        isOpen={!!selectedCourse}
        onClose={handleCloseView}
      />

      <PaginationWrapper
        pagination={pagination}
        handlePageChange={handlePageChange}
        loading={courseLoading}
      />

      <CourseFormModal
        isOpen={isOpen && ["create", "edit"].includes(type)}
        type={type as "create" | "edit"}
        data={data}
        loading={loading}
        formData={formData}
        errors={errors}
        onClose={closeModal}
        onChange={handleChange}
        onSelectChange={handleSelectChange}
        onFileChange={handleFileChange}
        onSubmit={handleSubmit}
        categoryOptions={categoryOptions}
        levelOptions={levelOptions}
        badgeOptions={badgeOptions}
      />

      <DeleteModal
        isOpen={isOpen && type === "delete"}
        isLoading={deleteLoading}
        itemName={data?.title || "this course"}
        onClose={closeModal}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default Courses;
