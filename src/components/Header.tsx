import React from "react";

interface HeaderProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  theme: string;
  toggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({
  searchTerm,
  setSearchTerm,
  theme,
  toggleTheme,
}) => {
  return (
    <header className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600 dark:from-gray-800 dark:via-gray-700 dark:to-gray-900 text-white p-4 shadow-md mb-6 w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 items-center">
        {/* Left Spacer */}
        <div className="hidden md:block" />

        {/* Centered Title */}
        <h1 className="text-xl md:text-2xl font-bold text-center">
          Welcome to Mahesh Addteq Online Store
        </h1>

        {/* Right: Search + Toggle */}
        <div className="flex justify-center md:justify-end gap-3 mt-4 md:mt-0">
          <input
            type="text"
            placeholder="Search by name or brand..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-40 md:w-64 px-3 py-1 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={toggleTheme}
            className="bg-white dark:bg-gray-700 text-black dark:text-white px-3 py-1 rounded text-sm shadow"
          >
            {theme === "dark" ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
