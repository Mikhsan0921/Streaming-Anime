"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Tabs, Tab, Button } from "@nextui-org/react";
import { IAnime } from "@/models/Anime";
import { FaPlay } from "react-icons/fa6";

const Page = ({ params }: { params: { id: string } }) => {
  const [anime, setAnime] = useState<IAnime | null>(null);

  useEffect(() => {
    const fetchAnime = async () => {
      try {
        const response = await fetch(`/api/anime/sync?id=${params.id}`);
        const data = await response.json();
        setAnime(data);
      } catch (error) {
        console.error("Error fetching anime data:", error);
      }
    };

    fetchAnime();
  }, [params.id]);

  return (
    <div className="relative">
      
      <div className="h-[40vh] w-full relative">
        <Image
          src={anime?.thumbnail || ""}
          alt={anime?.title || "Anime Title"}
          fill
          className="object-cover"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 to-transparent"></div>
      </div>

      <div className="relative -mt-[15vh] px-5 md:px-20 z-10">
        <div className="flex flex-col md:flex-row gap-10">
    
          <Image
            src={anime?.thumbnail || ""}
            alt={anime?.title || "Anime Thumbnail"}
            height={300}
            width={200}
            className="object-cover rounded-lg shadow-lg"
            unoptimized
          />

          <div className="flex flex-col justify-end gap-5">
            <h1 className="text-4xl md:text-5xl font-extrabold">
              {anime?.title || "Anime Title"}
            </h1>
            <Button startContent={<FaPlay />}>Start Watching</Button>
          </div>
        </div>

        <Tabs aria-label="Anime Details" className="mt-10">
          <Tab key="overview" title="Overview">
            <div className="grid md:grid-cols-5 gap-5">

              <div className="col-span-1">
                <h3 className="text-xl font-semibold">Details</h3>
                <div className="grid grid-cols-2 gap-x-10 gap-y-2 mt-2 text-sm">
                  <div>Aired:</div>
                  <div>{anime?.releaseDate || "Unknown"}</div>
                  <div>Rating:</div>
                  <div>{anime?.rating || "Unknown"}</div>
                  <div>Genres:</div>
                  <div>{anime?.genres?.join(", ") || "Unknown"}</div>
                  <div>Type:</div>
                  <div>{anime?.type || "Unknown"}</div>
                  <div>Status:</div>
                  <div>{anime?.status || "Unknown"}</div>
                  <div>Studios:</div>
                  <div>{anime?.studios || "Unknown"}</div>
                </div>
              </div>

              <div className="col-span-4">
                <h3 className="text-xl font-semibold">Description</h3>
                <p className="mt-2 text-sm leading-6">{anime?.description || "No description available."}</p>
              </div>
            </div>
          </Tab>
          <Tab key="episodes" title="Episodes">
            <div>
              <p className="text-sm">No episodes available.</p>
            </div>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default Page;
