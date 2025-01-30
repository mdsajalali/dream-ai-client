// Image Cart type
interface Image {
  id: number;
  url: string;
  creator: string;
  createdAt: string;
}

export interface ImageCardProps {
  image: Image;
}
