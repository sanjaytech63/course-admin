import { z } from 'zod';

const categoryOptions = [
  'frontend',
  'backend',
  'fullstack',
  'webdesign',
  'mobile',
  'devops',
  'cybersecurity',
  'testing',
] as const;

const badgeOptions = [
  'new',
  'trending',
  'popular',
  'featured',
  'recommended',
  'advanced',
  'beginner',
  'exclusive',
  'updated',
  'limited',
] as const;

export const createNewsSchema = z.object({
  title: z.string().min(5, { message: 'Title must be at least 5 characters' }),
  description: z.string().min(10, { message: 'Description must be at least 10 characters' }),
  date: z.string().optional().or(z.literal('')),
  author: z.string().min(2, { message: 'Author must be at least 2 characters' }),
  category: z.enum(categoryOptions, { message: 'Please select a valid category' }),
  readTime: z.string().optional().or(z.literal('')),
  badge: z.enum(badgeOptions).optional().or(z.literal('')),
});


export const validateImage = (image: File | null) => {
  if (!image) return 'Image is required';
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
  if (!allowedTypes.includes(image.type)) return 'Invalid image type';  
  const maxSizeMB = 5;
  if (image.size / 1024 / 1024 > maxSizeMB) return `Image must be smaller than ${maxSizeMB}MB`;
  return null;
};