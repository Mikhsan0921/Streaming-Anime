"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@nextui-org/react";
import { FaSearch } from "react-icons/fa";
import { useDebounce } from "use-debounce";
import AnimeCard from "@/components/ui/AnimeCard";
import { useRouter } from "next/navigation";
import path from "path";

export default function App({ searchParams }: any) {
  const [query, setQuery] = useState(searchParams.q || "");
  const [debouncedQuery] = useDebounce(query, 500);
  const [list, setList] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const fetchGenres = async (searchTerm: string) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/anime/sync?q=${searchTerm}`);
      const data = await response.json();
      setList(data.data || []);
    } catch (error) {
      console.error("Error fetching genres:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchParams.q || debouncedQuery.length >= 3) {
      fetchGenres(debouncedQuery);
      router.push(path.resolve("/manage/anime/sync") + "?q=" + debouncedQuery);
    } else {
      setList([]);
    }
  }, [debouncedQuery]);

  return (
    <div className="flex flex-col gap-4 viewport-container">
      <div className="flex flex-row justify-end gap-2">
        <Input
          placeholder="Search"
          startContent={<FaSearch />}
          isClearable
          className="max-w-md"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onClear={() => {
            setQuery("");
            router.push("/manage/anime/sync");
          }}
        />
      </div>
      <div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {list.length > 0 ? (
              list.map((anime) => (
                <AnimeCard
                  key={anime.mal_id}
                  type="anime"
                  anime={anime}
                  customUrl="sync"
                />
              ))
            ) : (
              <p>No results found</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
