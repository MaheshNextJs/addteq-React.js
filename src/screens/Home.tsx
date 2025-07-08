import React, { useState } from "react";
import { products } from "./Products";
import { useTheme } from "../ThemeContext";
import ProductCard from "./ProductCard";
import Header from "../components/Header";

const extractFeature = (features: string[], label: string) => {
  const feature = features.find((f) => f.startsWith(label));
  return feature ? feature.split(": ")[1] : "";
};

const HomeScreen: React.FC = () => {
  const [compareList, setCompareList] = useState<typeof products>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { theme, toggleTheme } = useTheme();

  const toggleCompare = (product: (typeof products)[0]) => {
    setCompareList((prev) => {
      if (prev.find((p) => p.id === product.id)) {
        return prev.filter((p) => p.id !== product.id);
      }
      if (prev.length < 3) {
        return [...prev, product];
      }
      return prev;
    });
  };

  const clearCompare = () => setCompareList([]);

  const getDifferences = (label: string) => {
    const values = compareList.map((p) => extractFeature(p.features, label));
    return values.map((val, i, arr) => arr.some((v) => v !== val));
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().startsWith(searchTerm.toLowerCase()) ||
      product.brand.toLowerCase().startsWith(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white dark:bg-gray-900 text-black dark:text-white min-h-screen">
      <Header
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 text-center">
        Users can select up to 3 products to compare side-by-side.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mx-10 pb-10">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            isCompared={compareList.some((p) => p.id === product.id)}
            toggleCompare={toggleCompare}
          />
        ))}
      </div>
      {compareList.length >= 2 && (
        <div className="mt-10 text-center">
          <h2 className="text-2xl font-bold mb-4">Comparison</h2>
          <div className="flex justify-center">
            <div className="overflow-x-auto">
              <div className="flex w-full rounded overflow-hidden">
                <div className="min-w-[150px] bg-gray-100 dark:bg-gray-700 p-2 font-semibold flex items-center justify-center text-center">
                  Feature
                </div>
                {compareList.map((product) => (
                  <div
                    key={product.id}
                    className="min-w-[200px] bg-gray-100 dark:bg-gray-700 p-2 flex flex-col items-center justify-center text-center"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-32 w-full object-contain mb-2"
                    />
                    <div className="font-semibold">{product.name}</div>
                  </div>
                ))}
              </div>

              {["Battery", "Screen", "Camera"].map((label, idx) => {
                const differences = getDifferences(label);
                return (
                  <div key={idx} className="flex w-full">
                    <div className="min-w-[150px] bg-gray-50 dark:bg-gray-800 p-2 font-semibold flex items-center justify-center text-center">
                      {label}
                    </div>
                    {compareList.map((p, i) => {
                      const value = extractFeature(p.features, label);
                      return (
                        <div
                          key={p.id}
                          className={`min-w-[200px] p-2 flex items-center justify-center text-center ${
                            differences[i] ? "text-red-700 font-bold" : ""
                          }`}
                        >
                          {value}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
          <button
            onClick={clearCompare}
            className="mt-4 px-6 py-2 mb-10 mt-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Clear All
          </button>
        </div>
      )}

      <footer className="fixed bottom-0 left-0 w-full bg-gradient-to-r via-red-600 from-orange-400 to-orange-600 text-xs text-white text-center py-1 shadow-md z-50">
        &copy; {new Date().getFullYear()} Mahesh Bairi. All rights reserved.
      </footer>
    </div>
  );
};

export default HomeScreen;
