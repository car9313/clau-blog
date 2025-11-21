export interface Category {
  slug: string;
  title: string;
}
export const categories: Category[] = [
  {
    slug: "1",
    title: "Frontend",
  },
  {
    slug: "2",
    title: "Backend",
  },
  {
    slug: "3",
    title: "Full-stack",
  },
  {
    slug: "4",
    title: "JavaScript",
  },
  {
    slug: "5",
    title: "Performance",
  },
  {
    slug: "6",
    title: "TypeScript",
  },
];

export function getAllCategories(): Category[] {
  return categories.sort(
    (a, b) => new Date(b.slug).getTime() - new Date(a.slug).getTime()
  );
}
