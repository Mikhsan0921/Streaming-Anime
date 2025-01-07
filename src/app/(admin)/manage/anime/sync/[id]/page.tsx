"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";
import { FaCloudArrowDown } from "react-icons/fa6";

const Page = ({ params }: { params: { id: string } }) => {
  const [anime, setAnime] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchAnime = async () => {
      try {
        const response = await fetch(`/api/anime/sync?id=${params.id}`);
        const data = await response.json();
        setAnime(data);
      } catch (error) {
        console.error("Error fetching anime:", error);
      }
    };

    fetchAnime();
  }, [params.id]);

  const handleImport = async () => {
    setIsLoading(true);
    setMessage("");
    try {
      const response = await fetch(`/api/anime/sync`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: params.id }),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage("Anime imported successfully!");
      } else {
        setMessage(result.error || "Failed to import anime.");
      }
    } catch (error) {
      console.error("Error importing anime:", error);
      setMessage("An error occurred while importing the anime.");
    } finally {
      setIsLoading(false);
    }
  };

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
        <div className="viewport-container mb-24">
          <div className="flex md:mt-[-12rem] mt-[-6.25rem] md:flex-row flex-col md:items-end gap-10">
            <div className="w-full max-w-[300px] flex flex-col gap-4">
              <Image
                src={anime?.thumbnail || ""}
                alt={anime?.title || "Title"}
                height={20}
                width={20}
                className="h-full w-full object-cover rounded-md hover:scale-105 hover:-translate-y-4 transition"
              />
              <Button
                radius="sm"
                size="lg"
                startContent={<FaCloudArrowDown size={25} />}
                className="font-bold"
                isDisabled={isLoading}
                onClick={handleImport}
              >
                {isLoading ? "Importing..." : "Import"}
              </Button>
              {message && (
                <p
                  className={`text-sm mt-2 ${
                    message.includes("successfully")
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {message}
                </p>
              )}
            </div>
            <div className="flex flex-col md:gap-5 gap-2 pb-16">
              <h1 className="md:text-5xl text-2xl md:font-black font-extrabold z-[9]">
                {anime?.title}
              </h1>
            </div>
          </div>
          <div className="w-full grid grid-cols-1 md:grid-cols-8 gap-x-10 gap-y-5 mt-10">
            <div className="col-span-2 flex flex-col gap-5 w-full">
              <h3 className="text-xl font-semibold">Details</h3>
              <div className="grid grid-cols-3 w-full md:text-base text-xs gap-y-2 gap-x-20 md:gap-x-0">
                <h3>Aired</h3>
                <span className="col-span-2">{anime?.releaseDate}</span>

                <h3>Genres</h3>
                <span className="col-span-2">{anime?.genres.join(", ")}</span>

                <h3>Type</h3>
                <span className="col-span-2">{anime?.type}</span>

                <h3>Status</h3>
                <span className="col-span-2">{anime?.status}</span>

                <h3>Studios</h3>
                <span className="col-span-2">{anime?.studio}</span>

                <h3>Rating</h3>
                <span className="col-span-2">{anime?.rating}</span>
              </div>
            </div>
            <div className="col-span-6 flex flex-col gap-5">
              <h3 className="text-xl font-semibold">Description</h3>
              <p className="md:text-base text-xs leading-6">
                {anime?.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
