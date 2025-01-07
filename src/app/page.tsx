"use client";

import AnimeCard from "@/components/ui/AnimeCard";
import { IAnime } from "@/models/Anime";
import { useEffect, useState } from "react";

export default function Home() {
  const [animes, setAnimes] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAnime = async () => {
    try {
      const response = await fetch("/api/anime");
      if (!response.ok) {
        throw new Error("Failed to fetch anime");
      }
      const data = await response.json();
      setAnimes(data);
    } catch (error) {
      setError("Error loading data");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnime();
  }, []);

  return (
    <div className="viewport-container">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {animes?.length > 0 ? (
              animes?.map((anime: IAnime) => (
                <AnimeCard key={anime.id} type="anime" anime={anime} />
              ))
            ) : (
              <p>No results found</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
