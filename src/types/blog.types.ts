
export type BlogCategory =
    | 'frontend'
    | 'backend'
    | 'fullstack'
    | 'webdesign'
    | 'mobile'
    | 'devops'
    | 'cybersecurity'
    | 'testing';

export type BlogBadge =
    | 'new'
    | 'trending'
    | 'popular'
    | 'featured'
    | 'recommended'
    | 'advanced'
    | 'beginner'
    | 'exclusive'
    | 'updated'
    | 'limited';

export interface CreateBlogData {
    title: string;
    description: string;
    author: string;
    category: BlogCategory;
    readTime: string;
    badge?: BlogBadge;
    tags?: string[];
}

export interface BlogFormData {
    title: string;
    description: string;
    author: string;
    category: BlogCategory | '';
    readTime: string;
    badge: BlogBadge | '';
    image: string;
    tags?: string[];
}

export interface BlogCardProps {
    blog: {
        _id: string;
        title: string;
        description: string;
        image: string;
        author: string;
        category: string;
        readTime: string;
        badge?: string;
        createdAt: string;
        updatedAt: string;
        tags?: string[];
        isPublished?: boolean;
        seo?: {
            metaTitle: string;
            metaDescription: string;
            keywords: string[];
        };
        slug?: string;
    };
    onEdit: (blog: any) => void;
    onDelete: (blog: any) => void;
    onView?: (blog: any) => void;
}

export interface BlogFormModalProps {
    isOpen: boolean;
    type: 'create' | 'edit';
    data?: any;
    onClose: () => void;
    onSubmit: (e: React.FormEvent) => void;
    onChange: (field: string) => (value: string) => void;
    onSelectChange: (field: string, value: string) => void;
    onFileChange: (file: File | null) => void;
    loading: boolean;
    formData: any;
    errors: Record<string, string>;
    categoryOptions: Array<{ value: string; label: string }>;
    badgeOptions: Array<{ value: string; label: string }>;
}

export interface BlogFilters {
    page?: number;
    limit?: number;
    category?: string;
    search?: string;
    sort?: 'newest' | 'oldest' | 'popular';
}