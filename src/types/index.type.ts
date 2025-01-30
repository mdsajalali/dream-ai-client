// Image Cart type
export interface ImageCardProps {
  image: {
    _id: string;
    imageUrl: string;
    creator: string;
    createdAt: string;
    prompt: string;
  };
}
