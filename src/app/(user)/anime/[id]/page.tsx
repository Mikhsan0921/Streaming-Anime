"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Tabs, Tab } from "@nextui-org/react";
import { IAnime } from "@/models/Anime";
import EpisodeCard from "@/components/ui/EpisodeCard";

const Page = ({ params }: { params: { id: string } }) => {
  const [anime, setAnime] = useState<IAnime | null>(null);

  useEffect(() => {
    const fetchAnime = async () => {
      try {
        const response = await fetch(`/api/anime?id=${params.id}`);
        const data = await response.json();
        setAnime(
          data.find((anime: IAnime) => anime.id === parseInt(params.id))
        );
      } catch (error) {
        console.error("Error fetching anime:", error);
      }
    };

    fetchAnime();
  }, [params.id]);

  return (
    <>
      <div className="h-[30vh] md:h-[40vh] w-full relative flex flex-col items-center">
        <Image
          src={anime?.banner || ""}
          alt={anime?.title || "Title"}
          height={100}
          width={100}
          className="h-full w-full object-cover"
        />
        <div className="absolute h-full w-full inset-0 m-auto bg-gradient-to-b from-transparent to-background"></div>
      </div>
      <div className="absolute z-20 top-[40%] flex justify-center w-full">
        <div className="viewport-container mb-24 flex flex-col gap-4">
          <Tabs aria-label="Options" size="lg">
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
                    <div>
                      {Array.isArray(anime?.genres)
                        ? anime.genres
                            .map((genre: any) => genre.name)
                            .join(", ")
                        : "Unknown"}
                    </div>
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
                  <p className="mt-2 text-sm leading-6">
                    {anime?.description || "No description available."}
                  </p>
                </div>
              </div>
            </Tab>
            <Tab key="episodes" title="Episodes">
              <div className="flex flex-col gap-4">
                {anime?.episodeList?.length ? (
                  anime.episodeList.map((ep: any) => (
                    <EpisodeCard
                      key={ep.episodeNumber}
                      anime={anime}
                      episode={ep}
                      customUrl="/anime"
                    />
                  ))
                ) : (
                  <p className="text-sm">No episodes available.</p>
                )}
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default Page;
