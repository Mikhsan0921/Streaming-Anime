"use client";

import React, { useEffect, useState } from "react";
import { Input, Pagination } from "@nextui-org/react";
import { FaSearch } from "react-icons/fa";
import { useDebounce } from "use-debounce";
import AnimeCard from "@/components/ui/AnimeCard";
import { useRouter } from "next/navigation";
import path from "path";
import { IAnime } from "@/models/Anime";

export default function App({ searchParams }: any) {
  const [query, setQuery] = useState(searchParams.q || "");
  const [page, setPage] = useState<number>(Number(searchParams.page) || 1);
  const [debouncedQuery] = useDebounce(query, 500);
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const fetchGenres = async (searchTerm: string) => {
    try {
      setLoading(true);
      const response = await fetch(
        `/api/anime/sync?q=${searchTerm}&page=${page}`
      );
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error("Error fetching genres:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchParams.q || debouncedQuery.length >= 3) {
      fetchGenres(debouncedQuery);
      router.push(
        path.resolve("/manage/anime/sync") +
          "?q=" +
          debouncedQuery +
          "&page=" +
          page
      );
    } else {
      setData(null);
    }
  }, [debouncedQuery, page]);

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
        ) : data?.data?.length > 0 ? (
          <div className="flex flex-col gap-8 items-center">
            <div className="flex flex-wrap gap-4">
              {data?.data?.map((anime: IAnime) => (
                <AnimeCard
                  key={anime.id}
                  type="anime"
                  anime={anime}
                  customUrl="sync"
                />
              ))}
            </div>
            <Pagination
              isCompact
              showControls
              initialPage={page}
              total={data?.pagination?.last_visible_page}
              onChange={setPage}
            />
          </div>
        ) : (
          <p>No results found</p>
        )}
      </div>
    </div>
  );
}
