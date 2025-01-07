"use client";
import React from "react";
import { FaPlay } from "react-icons/fa";
import { motion } from "framer-motion";
import Link from "next/link";
import { IAnime } from "@/models/Anime";
import Image from "next/image";

const AnimeCard = ({
  type,
  anime,
  customUrl,
}: {
  type: "episode" | "anime";
  anime: JikanAnimeData | IAnime;
  customUrl?: string;
}) => {
  const urlMaker = () => {
    switch (type) {
      case "episode":
        return customUrl ? `${customUrl}/${anime.id}` : `${anime.id}`;
      case "anime":
        return customUrl ? `${customUrl}/${anime.id}` : `${anime.id}`;
      default:
        return "";
    }
  };

  return (
    <motion.div
      className="relative w-[180px] h-[250px] lg:h-[300px] lg:w-[200px] group hover:cursor-pointer"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1, transition: { delay: 0.05 } }}
      whileHover={{ scale: 1.05 }}
    >
      <Link href={urlMaker()}>
        <motion.div whileTap={{ scale: 0.9 }}>
          <div className="flex flex-col space-y-2 justify-between bg-base-300 shadow-xl relative">
            <div className="relative w-full h-[250px] lg:h-[300px] overflow-hidden rounded-lg">
              <div className="absolute top-0 left-0 w-full h-full bg-zinc-900/40 z-10 group-hover:bg-zinc-900/0 transition-all"></div>
              <Image
                src={anime.thumbnail}
                alt={anime.title}
                className="delay-50 object-cover rotate-6 group-hover:rotate-0 scale-[1.3] group-hover:scale-100 transition-all"
                fill
              />
            </div>
            <div className="absolute bottom-0 p-2 flex flex-col w-full bg-gradient-to-b from-transparent to-primary-900 group-hover:to-primary-800 rounded-lg transition-all">
              <p className="font-extrabold text-sm capitalize truncate text-white">
                {anime.title}
              </p>
              <div className="flex items-center justify-between">
                <p className="text-xs text-white">{anime.releaseDate || "-"}</p>
                <FaPlay className="text-sm text-primary-400 group-hover:text-white transition-all" />
              </div>
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
};

export default AnimeCard;
