export interface ImageCardProps {
  image: SingleImageCardProps;
}

export interface SingleImageCardProps {
  _id: string;
  imageUrl: string;
  creator: string;
  createdAt: string;
  prompt: string;
}

export interface FavoriteProps {
  _id: string;
  image: SingleImageCardProps;
}

// BTN TYPE
export interface SliderArrowBtnProps {
  direction: "left" | "right";
  className?: string;
}

// PRODUCTS TYPE
export interface Product {
  id: number;
  product_name: string;
  img: string;
  price: number;
  up_to?: string;
  reviews?: number;
  sizes?: string[];
}

export interface LocalProduct extends Product {
  quantity: number;
}

export interface ProductCardProps {
  product: Product;
}

// Params type
export interface ParamsProps {
  params: {
    id: string;
  };
}

// Cart Item type
export interface CartItemProps {
  product: LocalProduct;
}

export type RegistrationProps = {
  isFormOpen: boolean;
  setIsFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
