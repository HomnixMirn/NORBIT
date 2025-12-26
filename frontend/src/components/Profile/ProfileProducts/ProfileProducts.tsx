// components/ProfileProducts/ProfileProducts.tsx
"use client";

interface Product {
  id: number;
  title: string;
  category: string;
  image: string;
}

interface ProfileProductsProps {
  products: Product[];
  isSeller: boolean; // добавляем флаг
}

export default function ProfileProducts({ products, isSeller }: ProfileProductsProps) {
  if (!isSeller || products.length === 0) return null; // покупатель — не показываем

  return (
    <div className="w-full max-w-4xl mb-6">
      <h3 className="text-xl font-bold mb-4">Ваши продукты</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {products.map(p => (
          <div key={p.id} className="bg-gray-100 p-4 rounded-xl">
            <img src={p.image} alt={p.title} className="w-full h-32 object-cover rounded mb-2" />
            <h4 className="font-semibold">{p.title}</h4>
            <p className="text-sm text-gray-600">{p.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
