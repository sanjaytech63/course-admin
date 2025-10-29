import React from "react";
import Modal from "./Modal";
import InputField from "./InputField";
import Button from "./Button";
import SelectField from "./SelectField";
import TextareaField from "./TextareaField";
import { BlogFormModalProps } from "../../types/blog.types";

const BlogFormModal: React.FC<BlogFormModalProps> = ({
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
  categoryOptions,
  badgeOptions,
}) => {
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    onFileChange(file);
  };

  const handleTextareaChange = (field: string) => (value: string) => {
    onChange(field)(value);
  };

  return (
    <Modal
      isOpen={isOpen}
      title={type === "create" ? "Write New Blog" : "Edit Blog"}
      onClose={onClose}
      size="xl"
    >
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Image {type === "create" ? "*" : ""}
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
          {type === "edit" && (
            <p className="text-sm text-gray-500 mt-1">
              Leave empty to keep current image
            </p>
          )}
        </div>

        <div>
          <InputField
            value={formData.title}
            label="Blog Title *"
            placeholder="Enter blog title"
            onChange={onChange("title")}
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title}</p>
          )}
        </div>

        <div>
          <TextareaField
            value={formData.description}
            label="Description *"
            placeholder="Write your blog description..."
            onChange={handleTextareaChange("description")}
            rows={4}
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">{errors.description}</p>
          )}
        </div>

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
              value={formData.badge}
              options={[{ value: "", label: "No Badge" }, ...badgeOptions]}
              onChange={(value: string) => onSelectChange("badge", value)}
            />
            {errors.badge && (
              <p className="text-red-500 text-sm mt-1">{errors.badge}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <InputField
              value={formData.author}
              label="Author *"
              placeholder="Enter author name"
              onChange={onChange("author")}
            />
            {errors.author && (
              <p className="text-red-500 text-sm mt-1">{errors.author}</p>
            )}
          </div>

          <div>
            <InputField
              value={formData.readTime}
              label="Read Time *"
              placeholder="Enter read time (e.g., 5 min)"
              onChange={onChange("readTime")}
            />
            {errors.readTime && (
              <p className="text-red-500 text-sm mt-1">{errors.readTime}</p>
            )}
          </div>
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" isLoading={loading}>
            {type === "create" ? "Publish Blog" : "Update Blog"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default BlogFormModal;
