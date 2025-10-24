import React from 'react';
import Modal from './Modal';
import InputField from './InputField';
import Button from './Button';
import SelectField from './SelectField';
import TextareaField from './TextareaField';

interface BlogFormModalProps {
    isOpen: boolean;
    type: 'create' | 'edit';
    data?: any;
    onClose: () => void;
    onSubmit: (form: any) => void;
}

const BlogFormModal: React.FC<BlogFormModalProps> = ({ isOpen, type, data, onClose, onSubmit }) => {
    return (
        <Modal isOpen={isOpen} title={type === 'create' ? 'Write New Blog' : 'Edit Blog'} onClose={onClose} size="xl">
            <div className="space-y-4">
                <InputField label="Blog Title" placeholder="Enter blog title" />
                <div className="grid grid-cols-2 gap-4">
                    <InputField label="Author" placeholder="Enter author name" />
                    <div>
                        <SelectField
                            label='Category'
                            options={[
                                { value: 'technology', label: 'Technology' },
                                { value: 'education', label: 'Education' },
                                { value: 'Business', label: 'Business' },
                                { value: 'lifestyle', label: 'Lifestyle' },
                            ]}
                        />
                    </div>
                </div>
                <div>
                    <TextareaField
                        label='Content'
                        placeholder="Write your blog content here..."
                    />
                </div>
                <div className="flex justify-end space-x-3 pt-4">
                    <Button variant="outline" onClick={onClose}>Cancel</Button>
                    <Button onClick={() => onSubmit(data)}>{type === 'create' ? 'Publish Blog' : 'Update Blog'}</Button>
                </div>
            </div>
        </Modal>
    );
};

export default BlogFormModal;
