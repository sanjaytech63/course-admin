export const categoryOptions = [
  { value: "frontend", label: "Frontend Development" },
  { value: "backend", label: "Backend Development" },
  { value: "fullstack", label: "Full Stack Development" },
  { value: "webdesign", label: "UI/UX & Web Design" },
  { value: "mobile", label: "Mobile App Development" },
  { value: "devops", label: "DevOps & Cloud" },
  { value: "cybersecurity", label: "Cybersecurity" },
  { value: "testing", label: "Testing & QA" },
];

export const badgeOptions = [
  { value: "new", label: "🆕 New" },
  { value: "trending", label: "🔥 Trending" },
  { value: "popular", label: "⭐ Popular" },
  { value: "featured", label: "🌟 Featured" },
  { value: "recommended", label: "👍 Recommended" },
];

export const itemsPerPageOptions = [
  { value: "6", label: "6 per page" },
  { value: "9", label: "9 per page" },
  { value: "12", label: "12 per page" },
  { value: "15", label: "15 per page" },
  { value: "20", label: "20 per page" },
];

export const getCategoryLabel = (value: string): string => {
  const category = categoryOptions.find((opt) => opt.value === value);
  return category ? category.label : value;
};

export const getBadgeLabel = (value: string): string => {
  const badge = badgeOptions.find((opt) => opt.value === value);
  return badge ? badge.label : value;
};

export const levelOptions = [
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
];

export const getLevelLabel = (value: string): string => {
  const level = levelOptions.find((opt) => opt.value === value);
  return level?.label || value;
};
