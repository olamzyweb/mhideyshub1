export type ImageItem = {
  id?: string;
  url: string;
};

export type CategoryItem = {
  id: string;
  name: string;
  slug: string;
};

export type ProductItem = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  featured: boolean;
  inStock: boolean;
  category: CategoryItem;
  images: ImageItem[];
};
