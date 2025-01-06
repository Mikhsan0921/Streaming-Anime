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
        console.error("Error fetching genres:", error);
      }
    };

    fetchAnime();
  }, [params.id]);

  return (
    <div>
      <div className="h-[30vh] md:h-[40vh] w-full relative ">
        <Image
          src={anime?.thumbnail || ""}
          alt={anime?.title || "Title"}
          height={100}
          width={100}
          className="h-full w-full object-cover"
          unoptimized
        />
        <div className="absolute h-full w-full inset-0 m-auto bg-gradient-to-r from-slate-900 to-transparent"></div>
      </div>
      <div className="absolute z-50 md:space-y-10 pb-20">
        <div className="flex md:mt-[-9.375rem] mt-[-6.25rem] md:flex-row flex-col md:items-end md:gap-20 gap-10 ">
          <Image
            src={anime?.thumbnail || ""}
            alt={anime?.title || "Title"}
            height={20}
            width={20}
            className="h-full w-full max-w-[300px] object-cover"
            unoptimized
          />
          <div className="flex flex-col md:gap-5 gap-2 pb-16">
            <h1 className="md:text-5xl text-2xl md:font-black font-extrabold z-[9]">
              {anime?.title}
            </h1>

            <Button startContent={<FaPlay />}>Continue Watching</Button>
          </div>
        </div>
        <Tabs aria-label="Options" size="lg">
          <Tab key="overview" title="Overview">
            <div className="w-full grid md:grid-cols-5 grid-cols-1 gap-x-20 gap-y-5 mt-10">
              <div className="col-span-1 flex flex-col gap-5 w-full">
                <h3 className="text-xl font-semibold">Details</h3>
                <div className="grid grid-cols-2 w-full md:text-base text-xs gap-y-2 gap-x-20 md:gap-x-0">
                  <h3>Aired</h3>
                  <span>{anime?.releaseDate}</span>

                  <h3>Rating</h3>
                  <span>{anime?.rating}</span>

                  <h3>Genres</h3>
                  <span>genres</span>

                  <h3>Type</h3>
                  <span>{anime?.type}</span>

                  <h3>Status</h3>
                  <span>{anime?.status}</span>

                  <h3>Studios</h3>
                  <span>test</span>
                </div>
              </div>
              <div className="col-span-4 flex flex-col gap-5">
                <h3 className="text-xl font-semibold">Description</h3>
                <p className="md:text-base text-xs leading-6">
                  {anime?.description}
                </p>
              </div>
            </div>
          </Tab>
          <Tab key="episodes" title="Episodes">
            <div></div>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default Page;
