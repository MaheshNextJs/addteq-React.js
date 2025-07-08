import React from "react";
import { ProductType } from "../types/ProductType";

interface ProductCardProps {
  product: ProductType;
  isCompared: boolean;
  toggleCompare: (product: ProductType) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isCompared,
  toggleCompare,
}) => (
  <div className="bg-gradient-to-r from-yellow-50 via-orange-50 to-red-50 dark:from-gray-800 dark:via-gray-700 dark:to-gray-900 text-white rounded-xl shadow p-3 text-center">
    <img
      src={product.image}
      alt={product.name}
      className="w-full h-56 object-contain rounded-xl mb-3"
    />
    <h2 className="text-lg text-red-900 font-semibold">{product.name}</h2>
    <p className="text-gray-600 dark:text-gray-300 text-sm">{product.brand}</p>
    <p className="font-semibold text-blue-700 dark:text-blue-300 text-base">
      {product.price}
    </p>
    <ul className="text-sm my-2 space-y-1">
      {product.features.map((f, i) => {
        const [label, value] = f.split(":").map((s) => s.trim());
        return (
          <li key={i} className="flex justify-center gap-2">
            <span className="text-gray-600 dark:text-gray-300 font-medium w-24 text-right">
              {label}:
            </span>
            <span className="w-28 text-black text-left">{value}</span>
          </li>
        );
      })}
    </ul>

    <button
      onClick={() => toggleCompare(product)}
      className={`mt-2 px-3 py-1 mb-2 text-white rounded-lg text-sm transition duration-300 ease-in-out ${
        isCompared
          ? "bg-red-600 hover:bg-red-700"
          : "bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600 hover:opacity-90"
      }`}
    >
      {isCompared ? "Remove" : "Add to Compare"}
    </button>
  </div>
);

export default ProductCard;
