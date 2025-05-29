interface ProductCardProps {
  name: string;
  price: string;
  rating: number;
  imageUrl: string;
}

export default function ProductCard({ name, price, rating, imageUrl }: ProductCardProps) {
  return (
    <div className="text-center">
      <img src={imageUrl} alt={name} className="w-full h-40 object-cover rounded-lg mb-4" />
      <h3 className="text-lg font-bold">{name}</h3>
      <p className="text-sm text-[#6C6C6C]">{price}</p>
      <div className="text-[#F4A825]">{"★".repeat(rating)}</div>
    </div>
  );
}