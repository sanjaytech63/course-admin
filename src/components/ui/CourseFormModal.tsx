import React from "react";
import Modal from "./Modal";
import InputField from "./InputField";
import Button from "./Button";
import SelectField from "./SelectField";
import TextareaField from "./TextareaField";
import CheckboxField from "./CheckboxField";
import { CourseFormModalProps } from "../../types/course.types";
import { badgeOptions, categoryOptions, levelOptions } from "../../constants";

const CourseFormModal: React.FC<CourseFormModalProps> = ({
  isOpen,
  type,
  onClose,
  onSubmit,
  onChange,
  onSelectChange,
  onFileChange,
  loading,
  formData,
  errors,
  course,
}) => {
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    onFileChange(file);
  };

  const handleTextareaChange = (field: string) => (value: string) => {
    onChange(field)(value);
  };

  console.log(errors, "errors");

  return (
    <Modal
      isOpen={isOpen}
      title={type === "create" ? "Create New Course" : "Edit Course"}
      onClose={onClose}
      size="lg"
    >
      <form
        onSubmit={onSubmit}
        className="space-y-6 max-h-[80vh] overflow-y-auto"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Course Image {type === "create" ? "*" : ""}
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileInputChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          {errors.image && (
            <p className="text-red-500 text-sm mt-1">{errors.image}</p>
          )}
          {type === "edit" && course?.image && (
            <p className="text-sm text-gray-500 mt-1">
              Current image: {course.image}
            </p>
          )}
        </div>

        <InputField
          value={formData.title}
          label="Course Title *"
          placeholder="Enter course title"
          onChange={onChange("title")}
          error={errors.title}
        />

        <TextareaField
          value={formData.description}
          label="Description *"
          placeholder="Enter course description"
          onChange={handleTextareaChange("description")}
          rows={3}
          error={errors.description}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <SelectField
              label="Category *"
              value={formData.category}
              options={[
                { value: "", label: "Select Category" },
                ...categoryOptions,
              ]}
              onChange={(value: string) => onSelectChange("category", value)}
            />
            {errors.category && (
              <p className="text-red-500 text-sm mt-1">{errors.category}</p>
            )}
          </div>

          <div>
            <SelectField
              label="Badge"
              value={formData.badge || ""}
              options={[{ value: "", label: "No Badge" }, ...badgeOptions]}
              onChange={(value: string) => onSelectChange("badge", value)}
            />
            {errors.badge && (
              <p className="text-red-500 text-sm mt-1">{errors.badge}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            value={formData.instructor}
            label="Instructor *"
            placeholder="Instructor name"
            onChange={onChange("instructor")}
            error={errors.instructor}
          />

          <SelectField
            label="Difficulty Level *"
            value={formData.level}
            options={levelOptions}
            onChange={(value: string) => onSelectChange("level", value)}
            error={errors.level}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            type="number"
            value={formData.originalPrice.toString()}
            label="Original Price *"
            placeholder="0.00"
            onChange={onChange("originalPrice")}
            min="0"
            error={errors.originalPrice}
          />

          <InputField
            type="number"
            value={formData.discountedPrice?.toString() || ""}
            label="Discounted Price"
            placeholder="0.00"
            onChange={onChange("discountedPrice")}
            min="0"
            error={errors.discountedPrice}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <InputField
            value={formData.duration}
            label="Duration *"
            placeholder="e.g., 10 weeks, 30 hours"
            onChange={onChange("duration")}
            error={errors.duration}
          />

          <InputField
            type="number"
            value={formData.totalHours.toString()}
            label="Total Hours"
            placeholder="0"
            onChange={onChange("totalHours")}
            min="0"
            error={errors.totalHours}
          />

          <InputField
            type="number"
            value={formData.lectures.toString()}
            label="Number of Lectures"
            placeholder="0"
            onChange={onChange("lectures")}
            min="0"
            error={errors.lectures}
          />

          <InputField
            type="number"
            value={formData.students.toString()}
            label="Students Enrolled"
            placeholder="0"
            onChange={onChange("students")}
            min="0"
            error={errors.students}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            type="number"
            value={formData.rating.toString()}
            label="Rating"
            placeholder="0.0 - 5.0"
            onChange={onChange("rating")}
            min="0"
            max="5"
            error={errors.rating}
          />

          <InputField
            type="number"
            value={formData.reviewCount.toString()}
            label="Review Count"
            placeholder="0"
            onChange={onChange("reviewCount")}
            min="0"
            error={errors.reviewCount}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            value={formData.icon || ""}
            label="Icon"
            placeholder="Icon name or URL"
            onChange={onChange("icon")}
            error={errors.icon}
          />

          <InputField
            value={formData.tags}
            label="Tags"
            placeholder="Enter tags separated by commas (e.g., javascript, react, web-development)"
            onChange={onChange("tags")}
            error={errors.tags}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <CheckboxField
            label="Featured Course"
            checked={formData.isFeatured}
            onChange={(checked) => onChange("isFeatured")(checked)}
          />

          <CheckboxField
            label="Active Course"
            checked={formData.isActive}
            onChange={(checked) => onChange("isActive")(checked)}
          />
        </div>

        <div className="flex justify-end space-x-3 pt-4 border-t">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" isLoading={loading}>
            {type === "create" ? "Create Course" : "Update Course"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default CourseFormModal;
