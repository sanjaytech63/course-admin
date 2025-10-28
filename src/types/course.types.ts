export interface Course {
  _id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  instructor: string;
  duration: string;
  originalPrice: number;
  discountedPrice?: number;
  discountPercentage?: number;
  rating: number;
  reviewCount: number;
  students: number;
  totalHours: number;
  lectures: number;
  level: 'beginner' | 'intermediate' | 'advanced';
  badge?: string;
  icon?: string;
  iconType: 'default' | 'cloud' | 'code' | 'chart';
  tags: string[];
  isFeatured: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CourseFormData {
  title: string;
  description: string;
  category: string;
  instructor: string;
  duration: string;
  originalPrice: number;
  discountedPrice?: number;
  discountPercentage?: number;
  rating: number;
  reviewCount: number;
  students: number;
  totalHours: number;
  lectures: number;
  level: 'beginner' | 'intermediate' | 'advanced';
  badge?: string;
  icon?: string;
  iconType: 'default' | 'cloud' | 'code' | 'chart';
  tags: string;
  isFeatured: boolean;
  isActive: boolean;
  image?: string;
}

export interface CourseFilters {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  level?: string;
  isFeatured?: boolean;
  minPrice?: number;
  maxPrice?: number;
  sort?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface CourseFormModalProps {
  isOpen: boolean;
  type: 'create' | 'edit';
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  onChange: (field: string) => (value: any) => void;
  onSelectChange: (field: string, value: string) => void;
  onFileChange: (file: File | null) => void;
  loading: boolean;
  data?: Course;
  formData: CourseFormData;
  errors: Record<string, string>;
  categoryOptions?: any;
  levelOptions?: any;
  badgeOptions?: any;
  course?: Course
}

export interface CourseCardProps {
  course: Course;
  onEdit: (course: Course) => void;
  onDelete: (course: Course) => void;
  onView?: (course: Course) => void;
}

export interface CourseGridProps {
  courses: Course[];
  onEdit: (course: Course) => void;
  onDelete: (course: Course) => void;
  onView?: (course: Course) => void;
  loading?: boolean;
  error?: string | null;
  onRetry?: () => void;
}