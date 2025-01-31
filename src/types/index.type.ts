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
