import React, { useEffect, useState } from "react";
import Home from "./components/Home";
import WeatherDetails from "./components/WeatherDetails";

function App() {
  const [selectedCity, setSelectedCity] = useState("Hyderabad");
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  return (
    <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-gray-100"} min-h-screen`}>
      <button 
        onClick={() => setDarkMode(!darkMode)}
        className="absolute top-4 right-4 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-700 transition">
        {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
      </button>

      <div className="flex min-h-screen max-h-screen">
        <div className="w-[250px] h-screen p-6 bg-gradient-to-r from-blue-400 to-purple-600 text-white flex items-center justify-center">
          <Home onCitySelect={setSelectedCity} />
        </div>

        <div className="h-screen p-6">
          {selectedCity ? (
            <WeatherDetails city={selectedCity} darkMode={darkMode} />
          ) : (
            <p className="text-center text-gray-500">Search for a city to see weather details.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
