"use client";

import AnimeCard from "@/components/ui/AnimeCard";
import { useEffect, useState } from "react";

export default function Home() {
  const [anime, setAnime] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnime = async () => {
      try {
        const response = await fetch("/api/anime");
        if (!response.ok) {
          throw new Error("Failed to fetch anime");
        }
        const data = await response.json();
        setAnime(data.data);
      } catch (error) {
        setError("Error loading data");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnime();
  }, []);

  return (
    <div>
      <p className="text-xl mt-20 lg:mt-30 mb-10 uppercase font-bold text-pink-200 tracking-widest">
        All Anime
      </p>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="flex flex-wrap justify-between lg:justify-start xl:gap-8 lg:gap-6 gap-3 m-2 lg:m-0">
          {anime.map((animeItem: any) => (
            <AnimeCard
              id={animeItem.id}
              key={animeItem.id}
              title={animeItem.judul}
              src={animeItem.thumbnail}
              released={animeItem.released}
            />
          ))}
        </div>
      )}
    </div>
  );
}
