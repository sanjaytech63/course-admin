import { useState, useCallback } from 'react';
import { Course, CourseFormData } from '../types/course.types';
import { courseFormSchema } from '../validations/course.schema';
import { handleError } from '../utils/toastHandler';
import { ZodError } from 'zod';

interface UseCourseFormProps {
    course?: Course;
    onSubmit: (formData: FormData) => Promise<void>;
}

export const useCourseForm = ({ course, onSubmit }: UseCourseFormProps) => {
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [imageFile, setImageFile] = useState<File | null>(null);

    const initialFormData: CourseFormData = {
        title: course?.title || '',
        description: course?.description || '',
        category: course?.category || '',
        instructor: course?.instructor || '',
        duration: course?.duration || '',
        originalPrice: course?.originalPrice || 0,
        discountedPrice: course?.discountedPrice || undefined,
        discountPercentage: course?.discountPercentage || 0,
        rating: course?.rating || 0,
        reviewCount: course?.reviewCount || 0,
        students: course?.students || 0,
        totalHours: course?.totalHours || 0,
        lectures: course?.lectures || 0,
        level: course?.level || 'beginner',
        badge: course?.badge || '',
        icon: course?.icon || '',
        iconType: course?.iconType || 'default',
        tags: course?.tags?.join(', ') || '',
        isFeatured: course?.isFeatured || false,
        isActive: course?.isActive !== false,
    };

    const [formData, setFormData] = useState<CourseFormData>(initialFormData);

    const validateForm = useCallback((): boolean => {
        try {
            const validationData = {
                ...formData,
                // ensure all number fields are strings for Zod's string().transform()
                originalPrice: formData.originalPrice.toString(),
                discountedPrice: formData.discountedPrice?.toString() || '',
                discountPercentage: formData.discountPercentage?.toString() || '',
                rating: formData.rating.toString(),
                reviewCount: formData.reviewCount.toString(),
                students: formData.students.toString(),
                totalHours: formData.totalHours.toString(),
                lectures: formData.lectures.toString(),
                isFeatured: formData.isFeatured,
                isActive: formData.isActive,
            };

            courseFormSchema.parse(validationData);
            setErrors({});

            if (!course && !imageFile) {
                setErrors(prev => ({ ...prev, image: 'Image is required for new courses' }));
                return false;
            }

            return true;

        } catch (err: any) {
            console.log(err, "err on handle submit");

            if (err instanceof ZodError) {
                const fieldErrors: Record<string, string> = {};
                err.issues.forEach((issue) => {
                    if (issue.path[0] && issue.message) {
                        fieldErrors[issue.path[0].toString()] = issue.message;
                    }
                });
                setErrors(fieldErrors);
            } else {
                const errorMessage = err?.response?.data?.message || 'Failed to process course';
                handleError(errorMessage);
            }

            // ✅ Return false explicitly so caller knows validation failed
            return false;
        }
    }, [formData, imageFile, course]);


    const handleChange = useCallback((field: string) => (value: any) => {
        const numberFields = [
            'originalPrice', 'discountedPrice', 'discountPercentage',
            'rating', 'reviewCount', 'students', 'totalHours', 'lectures'
        ];

        let processedValue = value;

        if (numberFields.includes(field)) {
            if (value === '' || value === null || value === undefined) {
                processedValue = field === 'discountedPrice' || field === 'discountPercentage' ? undefined : 0;
            } else {
                processedValue = parseFloat(value);
                if (isNaN(processedValue)) {
                    processedValue = field === 'discountedPrice' || field === 'discountPercentage' ? undefined : 0;
                }
            }
        }

        setFormData(prev => ({
            ...prev,
            [field]: processedValue,
        }));

        if (errors[field]) {
            setErrors(prev => ({
                ...prev,
                [field]: '',
            }));
        }
    }, [errors]);

    const handleSelectChange = useCallback((field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value,
        }));

        if (errors[field]) {
            setErrors(prev => ({
                ...prev,
                [field]: '',
            }));
        }
    }, [errors]);

    const handleFileChange = useCallback((file: File | null) => {
        setImageFile(file);
        if (errors.image) {
            setErrors(prev => ({
                ...prev,
                image: '',
            }));
        }
    }, [errors]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);


        const isValid = validateForm();
        if (!isValid) {
            setLoading(false);
            return;
        }

        try {
            const submitFormData = new FormData();

            Object.entries(formData).forEach(([key, value]) => {
                if (value !== null && value !== undefined) {
                    submitFormData.append(key, value.toString());
                }
            });

            if (formData.tags) {
                const tagsArray = formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
                submitFormData.set('tags', JSON.stringify(tagsArray));
            }

            if (imageFile) {
                submitFormData.append('image', imageFile);
            }

            await onSubmit(submitFormData);
        } catch (err: any) {
            console.log(err, "err on handle submit");

            if (err instanceof ZodError) {
                const fieldErrors: Record<string, string> = {};
                err.issues.forEach((issue) => {
                    if (issue.path[0] && issue.message) {
                        fieldErrors[issue.path[0].toString()] = issue.message;
                    }
                });
                setErrors(fieldErrors);
            } else {
                const errorMessage = err?.response?.data?.message || 'Failed to process course';
                handleError(errorMessage);
            }
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        errors,
        formData,
        imageFile,
        handleChange,
        handleSelectChange,
        handleFileChange,
        handleSubmit,
        validateForm,
    };
};