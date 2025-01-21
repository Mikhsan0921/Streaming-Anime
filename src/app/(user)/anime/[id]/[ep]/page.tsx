"use client";

import { useEffect, useState } from "react";
import { IAnime } from "@/models/Anime";

const Page = ({ params }: { params: { id: string; ep: string } }) => {
  const [anime, setAnime] = useState<IAnime | null>(null);

  useEffect(() => {
    const fetchAnime = async () => {
      try {
        const response = await fetch(`/api/anime?id=${params.id}`);
        const data = await response.json();
        setAnime(data[0]);
      } catch (error) {
        console.error("Error fetching anime:", error);
      }
    };

    fetchAnime();
  }, [params.id]);

  const embedHtml =
    anime?.episodeList[parseInt(params.ep) - 1]?.streams[0]?.url;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="relative bg-black flex justify-center items-center overflow-hidden rounded-lg">
              <div className="w-full aspect-video relative">
                {anime ? (
                  embedHtml ? (
                    <div
                      dangerouslySetInnerHTML={{ __html: embedHtml }}
                      className="w-full h-full"
                    />
                  ) : (
                    <p className="text-center text-gray-400">
                      Embed video tidak tersedia
                    </p>
                  )
                ) : (
                  <p className="text-center text-gray-400">Memuat...</p>
                )}
              </div>
            </div>
            <div className="mt-4">
              <h2 className="text-2xl font-bold">{anime?.title}</h2>
              <p className="text-gray-400">
                Episode{" "}
                {anime?.episodeList[parseInt(params.ep) - 1]?.episodeNumber} -{" "}
                {anime?.episodeList[parseInt(params.ep) - 1]?.title}
              </p>
            </div>
          </div>

          <div className="bg-gray-800 p-4 rounded-lg">
            <h3 className="text-lg font-semibold">Episode Playlist</h3>
            <ul className="mt-4 space-y-2">
              {anime?.episodeList.map((episode, index) => (
                <li
                  key={index}
                  className={`p-2 rounded-lg ${
                    parseInt(params.ep) === index + 1
                      ? "bg-pink-500"
                      : "bg-gray-700 hover:bg-gray-600"
                  }`}
                >
                  <a
                    href={`/anime/${params.id}/${episode.episodeNumber}`}
                    className="block text-white"
                  >
                    Episode {episode.episodeNumber}
                  </a>
                </li>
              )) || <p>No episodes available</p>}
            </ul>
          </div>
        </div>

        <div className="mt-8 bg-gray-800 p-4 rounded-lg">
          <h3 className="text-lg font-semibold">{anime?.title}</h3>
          <p className="text-gray-400 mt-2">{anime?.description}</p>
        </div>
      </div>
    </div>
  );
};

export default Page;
