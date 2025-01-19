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
    <div>
      <p>
        {anime?.title} - Eps
        {anime?.episodeList[parseInt(params.ep) - 1].episodeNumber} -{" "}
        {anime?.episodeList[parseInt(params.ep) - 1].title}
      </p>
      <div className="h-[30vh] md:h-[40vh] w-full relative">
        {anime ? (
          <div>
            {embedHtml ? (
              <div dangerouslySetInnerHTML={{ __html: embedHtml }} />
            ) : (
              <p>Embed video tidak tersedia</p>
            )}
          </div>
        ) : (
          <p>Memuat...</p>
        )}
      </div>
    </div>
  );
};

export default Page;
