import React, { useState } from 'react';
import { useStore } from '../store/store';
import { Table } from '../components/ui/Table';
import Button from '../components/ui/Button';
import InputField from '../components/ui/InputField';
import Modal from '../components/ui/Modal';
import { FiEdit2, FiTrash2, FiPlus } from 'react-icons/fi';
import SelectField from '../components/ui/SelectField';
import TextareaField from '../components/ui/TextareaField';
import ImageUploader from '../components/ui/ImageUploader';

export const Courses: React.FC = () => {
    const { courses, deleteCourse, openModal, closeModal, isOpen, type, data } = useStore();
    const [searchTerm, setSearchTerm] = useState('');

    const filteredCourses = courses.filter(course =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const columns = [
        {
            key: 'title',
            header: 'Course',
            render: (value: string, row: any) => (
                <div className="flex items-center space-x-3">
                    <img
                        src={row.thumbnail}
                        alt={value}
                        className="w-12 h-8 object-cover rounded"
                    />
                    <div>
                        <div className="font-medium text-gray-900">{value}</div>
                        <div className="text-gray-500 text-sm">{row.instructor}</div>
                    </div>
                </div>
            ),
        },
        { key: 'category', header: 'Category' },
        {
            key: 'price',
            header: 'Price',
            render: (value: number) => `$${value}`,
        },
        {
            key: 'status',
            header: 'Status',
            render: (value: string) => (
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${value === 'published' ? 'bg-green-100 text-green-800' :
                    value === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                    }`}>
                    {value}
                </span>
            ),
        },
        { key: 'students', header: 'Students' },
        {
            key: 'actions',
            header: 'Actions',
            render: (_: any, row: any) => (
                <div className="flex space-x-2">
                    <Button
                        onClick={() => openModal('edit', row)}
                    >
                        <FiEdit2 size={16} />
                    </Button>
                    <Button

                        onClick={() => openModal('delete', row)}
                    >
                        <FiTrash2 size={16} />
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Courses</h1>
                    <p className="text-gray-600">Manage platform courses</p>
                </div>
                <Button onClick={() => openModal('create')}>
                    <FiPlus className="mr-2" size={16} />
                    Add Course
                </Button>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
                <InputField
                    placeholder="Search courses..."
                    value={searchTerm}
                    className="sm:max-w-xs"
                />
            </div>

            <Table columns={columns} data={filteredCourses} />

            {(type === 'create' || type === 'edit') && (
                <Modal
                    isOpen={isOpen}
                    title={type === 'create' ? 'Add New Course' : 'Edit Course'}
                    onClose={closeModal}
                    size="lg"
                >
                    <div className="space-y-4">
                        <ImageUploader />
                        <InputField label="Course Title" placeholder="Enter course title" />
                        <InputField label="Instructor" placeholder="Enter instructor name" />
                        <div className="grid grid-cols-2 gap-4">
                            <InputField label="Price" type="number" placeholder="0.00" />
                            <div>
                                <SelectField
                                    label='Category'
                                    options={[
                                        { value: 'web', label: 'Web Development' },
                                        { value: 'mobile', label: 'Mobile Development' },
                                        { value: 'design', label: 'Design' },
                                        { value: 'business', label: 'Business' },
                                    ]}
                                />
                            </div>
                        </div>
                        <div>
                            <TextareaField
                                label="Description"
                                placeholder="Enter course description..."
                                helperText="Keep it short and relevant"
                            />
                        </div>
                        <div className="flex justify-end space-x-3 pt-4">
                            <Button variant="outline" onClick={closeModal}>
                                Cancel
                            </Button>
                            <Button>
                                {type === 'create' ? 'Create Course' : 'Update Course'}
                            </Button>
                        </div>
                    </div>
                </Modal>
            )}

            {type === 'delete' && (
                <Modal
                    isOpen={isOpen}
                    title="Delete Course"
                    onClose={closeModal}
                    size="sm"
                >
                    <div className="space-y-4">
                        <p className="text-gray-600">
                            Are you sure you want to delete course <strong>{data?.title}</strong>? This action cannot be undone.
                        </p>
                        <div className="flex justify-end space-x-3">
                            <Button variant="outline" onClick={closeModal}>
                                Cancel
                            </Button>
                            <Button variant='danger' onClick={() => {
                                deleteCourse(data.id);
                                closeModal();
                            }}>
                                Delete
                            </Button>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
};