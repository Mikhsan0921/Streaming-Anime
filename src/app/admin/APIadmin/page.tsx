"use client";

import { Button, Input } from "@nextui-org/react";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";

export default function Home() {
  const [anime, setAnime] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearch = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://api.jikan.moe/v4/anime?q=${searchQuery}`);
      const data = await response.json();

      if (response.ok) {
        setAnime(data.data);
      } else {
        setError("Failed to fetch data");
      }
    } catch (err) {
      setError("Something went wrong!");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-4">
      <div className="flex items-center gap-2 mb-6">
        <Input
          isClearable
          placeholder="Search anime by name..."
          startContent={<FaSearch />}
          className="bg-gray-800 text-gray-100 placeholder-gray-400"
          value={searchQuery}
          onClear={() => setSearchQuery("")}
          onValueChange={(e) => setSearchQuery(e)}
        />
        <Button
          onClick={handleSearch}
          isDisabled={!searchQuery}
          className="bg-blue-500 text-white hover:bg-blue-600"
        >
          Search
        </Button>
      </div>

      {/* Anime */}
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : anime.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {anime.map((item) => (
            <div
              key={item.mal_id}
              className="bg-gray-800 shadow-md rounded overflow-hidden hover:shadow-lg hover:scale-105 transform transition-all duration-200"
            >
              {/* Full Image */}
              <div className="w-full h-64">
                <img
                  src={item.images?.jpg?.image_url}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Anime Details */}
              <div className="p-4">
                <h3 className="text-lg font-bold text-white">{item.title}</h3>
                <p className="text-sm text-gray-400">{item.type}</p>
                <p className="text-sm text-gray-400">
                  <strong>Episodes:</strong> {item.episodes || "N/A"}
                </p>
                <p className="text-sm text-gray-400">
                  <strong>Status:</strong> {item.status}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
}
