import Container from "@/components/shared/Container";
import ImageCard from "@/components/shared/ImageCard";

const images = [
  {
    id: 1,
    url: "https://i.pinimg.com/736x/be/1b/75/be1b75b50475a53d3bb802a3e64c15e6.jpg",
    creator: "Sajal",
    createdAt: "2025-01-30 10:00 AM",
  },
  {
    id: 2,
    url: "https://i.pinimg.com/736x/be/1b/75/be1b75b50475a53d3bb802a3e64c15e6.jpg",
    creator: "Alex",
    createdAt: "2025-01-30 11:15 AM",
  },
  {
    id: 3,
    url: "https://i.pinimg.com/736x/be/1b/75/be1b75b50475a53d3bb802a3e64c15e6.jpg",
    creator: "Emma",
    createdAt: "2025-01-30 12:30 PM",
  },
  {
    id: 4,
    url: "https://i.pinimg.com/736x/be/1b/75/be1b75b50475a53d3bb802a3e64c15e6.jpg",
    creator: "Noah",
    createdAt: "2025-01-30 01:45 PM",
  },
  {
    id: 5,
    url: "https://i.pinimg.com/736x/be/1b/75/be1b75b50475a53d3bb802a3e64c15e6.jpg",
    creator: "Liam",
    createdAt: "2025-01-30 03:00 PM",
  },
];

const ImagesPage = () => {
  return (
    <Container>
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {images.map((image) => (
          <ImageCard key={image.id} image={image} />
        ))}
      </div>
    </Container>
  );
};

export default ImagesPage;
