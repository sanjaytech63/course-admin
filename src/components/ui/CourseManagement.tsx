import React from 'react';
import CourseFormModal from './CourseFormModal';
import { useCourseForm } from '../../hooks/useCourseForm';
import { createCourse, updateCourse } from '../../api/course.service';
import { Course } from '../../types/course.types';

interface CourseManagementProps {
    isModalOpen: boolean;
    modalType: 'create' | 'edit';
    selectedCourse?: Course;
    onClose: () => void;
    onSuccess: () => void;
}

export const CourseManagement: React.FC<CourseManagementProps> = ({
    isModalOpen,
    modalType,
    selectedCourse,
    onClose,
    onSuccess,
}) => {
    const handleSubmit = async (formData: FormData) => {
        try {
            if (modalType === 'create') {
                await createCourse(formData);
            } else if (selectedCourse) {
                await updateCourse(selectedCourse.id, formData);
            }
            onSuccess();
            onClose();
        } catch (error) {
            console.error('Error submitting course:', error);
            throw error;
        }
    };

    const {
        loading,
        errors,
        formData,
        handleChange,
        handleSelectChange,
        handleFileChange,
        handleSubmit: handleFormSubmit,
    } = useCourseForm({
        course: selectedCourse,
        onSubmit: handleSubmit,
    });

    return (
        <CourseFormModal
            isOpen={isModalOpen}
            type={modalType}
            onClose={onClose}
            onSubmit={handleFormSubmit}
            onChange={handleChange}
            onSelectChange={handleSelectChange}
            onFileChange={handleFileChange}
            loading={loading}
            formData={formData}
            errors={errors}
            course={selectedCourse}
        />
    );
};