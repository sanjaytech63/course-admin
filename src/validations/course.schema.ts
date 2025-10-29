import { z } from "zod";

const numberString = z.string().transform((val, ctx) => {
  const parsed = parseFloat(val);
  if (isNaN(parsed)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Not a valid number",
    });
    return z.NEVER;
  }
  return parsed;
});

const optionalNumberString = z
  .string()
  .optional()
  .transform((val, ctx) => {
    if (!val || val === "") return undefined;
    const parsed = parseFloat(val);
    if (isNaN(parsed)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Not a valid number",
      });
      return z.NEVER;
    }
    return parsed;
  });

export const courseFormSchema = z
  .object({
    title: z
      .string()
      .min(1, "Title is required")
      .max(200, "Title must be less than 200 characters"),

    description: z
      .string()
      .min(10, "Description must be at least 10 characters")
      .max(1000, "Description must be less than 1000 characters"),

    category: z.string().min(1, "Category is required"),

    instructor: z.string().min(1, "Instructor is required"),

    duration: z.string().min(1, "Duration is required"),

    originalPrice: numberString
      .refine((val) => val >= 0, "Original price cannot be negative")
      .refine((val) => val <= 10000, "Price seems too high"),

    discountedPrice: optionalNumberString
      .refine(
        (val) => val === undefined || val >= 0,
        "Discounted price cannot be negative",
      )
      .nullable()
      .optional(),

    discountPercentage: optionalNumberString
      .refine(
        (val) => val === undefined || (val >= 0 && val <= 100),
        "Discount percentage must be between 0 and 100",
      )
      .nullable()
      .optional(),

    rating: numberString.refine(
      (val) => val >= 0 && val <= 5,
      "Rating must be between 0 and 5",
    ),

    reviewCount: numberString.refine(
      (val) => val >= 0,
      "Review count cannot be negative",
    ),

    students: numberString.refine(
      (val) => val >= 0,
      "Students count cannot be negative",
    ),

    totalHours: numberString.refine(
      (val) => val >= 0,
      "Total hours cannot be negative",
    ),

    lectures: numberString.refine(
      (val) => val >= 0,
      "Lectures count cannot be negative",
    ),

    level: z.enum(["beginner", "intermediate", "advanced"]),

    badge: z.string().optional(),

    icon: z.string().optional(),

    iconType: z.enum(["default", "cloud", "code", "chart", "design"]),

    tags: z.string().optional(),

    isFeatured: z
      .union([z.boolean(), z.string()])
      .transform((val) => val === "true" || val === true),

    isActive: z
      .union([z.boolean(), z.string()])
      .transform((val) => val !== "false" && val !== false),
  })
  .refine(
    (data) => {
      if (data.discountedPrice && data.originalPrice) {
        return data.discountedPrice <= data.originalPrice;
      }
      return true;
    },
    {
      message: "Discounted price cannot be higher than original price",
      path: ["discountedPrice"],
    },
  );

export type CourseFormInput = z.infer<typeof courseFormSchema>;

export const validateImage = (file: File): string | null => {
  if (!file) return "Image is required";

  const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
  if (!validTypes.includes(file.type)) {
    return "Please select a valid image file (JPEG, PNG, or WebP)";
  }

  const maxSize = 5 * 1024 * 1024; // 5MB
  if (file.size > maxSize) {
    return "Image size must be less than 5MB";
  }

  return null;
};
