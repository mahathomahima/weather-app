import React, { useState } from "react";

function Home({ onCitySelect }) {
  const [city, setCity] = useState("");

  const handleSearch = () => {
    if (city.trim() !== "") {
      onCitySelect(city);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4">Weather App</h1>
      <input
        type="text"
        placeholder="Enter city name..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="w-full max-w-md p-3 text-black border rounded"
      />
      <button 
        onClick={handleSearch}
        className="mt-4 px-6 py-2 bg-white text-blue-700 font-bold rounded-lg shadow-md hover:bg-blue-100 transition">
        Search Weather
      </button>
    </div>
  );
}

export default Home;
