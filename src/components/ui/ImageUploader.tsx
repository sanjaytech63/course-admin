import React, { useState } from "react";
import { FiUpload, FiX } from "react-icons/fi";

interface ImageUploaderProps {
  label?: string;
  onChange?: (files: File[]) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ label = "Upload Images", onChange }) => {
  const [previews, setPreviews] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    const newPreviews = selectedFiles.map((file) => URL.createObjectURL(file));

    const updatedFiles = [...files, ...selectedFiles];
    const updatedPreviews = [...previews, ...newPreviews];

    setFiles(updatedFiles);
    setPreviews(updatedPreviews);
    if (onChange) onChange(updatedFiles);
  };

  const removeImage = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    const updatedPreviews = previews.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    setPreviews(updatedPreviews);
    if (onChange) onChange(updatedFiles);
  };

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      <div
        className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-4 cursor-pointer transition group hover:border-indigo-500"
        onClick={() => document.getElementById("fileInput")?.click()}
      >
        <FiUpload className="text-gray-400 group-hover:text-indigo-600 mr-2" size={20} />
        <span className="text-gray-400 group-hover:text-indigo-600">
          Click to select images
        </span>
        <input
          id="fileInput"
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>


      {previews.length > 0 && (
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {previews.map((src, index) => (
            <div key={index} className="relative group">
              <img
                src={src}
                alt={`Preview ${index}`}
                className="w-full h-32 object-cover rounded-lg border"
              />
              <button
                type="button"
                className="absolute top-1 right-1 bg-white rounded-full p-1 shadow-md opacity-0 group-hover:opacity-100 transition"
                onClick={() => removeImage(index)}
              >
                <FiX className="text-red-500" size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
