interface ArtisanCardProps {
  name: string;
  description: string;
  imageUrl: string;
}

export default function ArtisanCard({ name, description, imageUrl }: ArtisanCardProps) {
  return (
    <div className="text-center">
      <img src={imageUrl} alt={name} className="w-full h-48 object-cover rounded-lg mb-4" />
      <h3 className="text-lg font-bold">{name}</h3>
      <p className="text-sm text-[#6C6C6C]">{description}</p>
    </div>
  );
}
