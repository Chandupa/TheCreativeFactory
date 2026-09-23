export interface ProjectMedia {
  type: "image" | "video";
  src: string;
  alt: string;
}

export interface Project {
  slug: string;
  title: string;
  client?: string;
  category: string;
  year: number;
  summary: string;
  coverImage?: string;
  media: ProjectMedia[];
}
