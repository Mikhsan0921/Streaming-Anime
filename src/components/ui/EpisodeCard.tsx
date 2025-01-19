"use client";
import React from "react";
import { IAnime, IEpisode } from "@/models/Anime";
import Link from "next/link";

const EpisodeCard = ({
  anime,
  episode,
  customUrl,
}: {
  anime: IAnime;
  episode: IEpisode;
  customUrl?: string;
}) => {
  return (
    <Link
      href={
        customUrl
          ? `${customUrl}/${anime.id}/${episode.episodeNumber}`
          : `/${anime.id}/${episode.episodeNumber}`
      }
      className="flex flex-col space-y-2 justify-between p-4 rounded-lg bg-zinc-700 shadow-xl relative"
    >
      <p>Episode {episode.episodeNumber}</p>
      <p>{episode.title}</p>
    </Link>
  );
};

export default EpisodeCard;
