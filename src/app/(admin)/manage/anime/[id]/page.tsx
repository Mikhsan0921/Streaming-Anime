"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  Tabs,
  Tab,
  Input,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { IAnime } from "@/models/Anime";
import { FaPlus } from "react-icons/fa6";
import EpisodeCard from "@/components/ui/EpisodeCard";

const Page = ({ params }: { params: { id: string } }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [anime, setAnime] = useState<IAnime | null>(null);
  const [episodeNumber, setEpisodeNumber] = useState(1);
  const [episodeTitle, setEpisodeTitle] = useState("");
  const [streams, setStreams] = useState([{ url: "", label: "", quality: "" }]);

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

  const handleAddStream = () => {
    setStreams((prevStreams) => [
      ...prevStreams,
      { url: "", label: "", quality: "" },
    ]);
  };

  const handleRemoveStream = (index: number) => {
    setStreams((prevStreams) => prevStreams.filter((_, i) => i !== index));
  };

  const handleStreamChange = (index: number, updatedStream: any) => {
    setStreams((prevStreams) =>
      prevStreams.map((stream, i) => (i === index ? updatedStream : stream))
    );
  };

  const handleAddEpisode = async () => {
    const newEpisode = {
      episodeNumber,
      title: episodeTitle,
      streams,
    };

    try {
      const response = await fetch("/api/episode", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          animeId: params.id,
          episode: newEpisode,
        }),
      });

      if (response.ok) {
        console.log("Episode added successfully!");
        onOpenChange();
      } else {
        const error = await response.json();
        console.error("Error adding episode:", error);
      }
    } catch (err) {
      console.error("Network error:", err);
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
                  <h3 className="text-xl font-semibold">
                    {anime?.title || "Unknown"}
                  </h3>
                  <p className="mt-2 text-sm leading-6">
                    {anime?.description || "No description available."}
                  </p>
                </div>
              </div>
            </Tab>
            <Tab key="episodes" title="Episodes">
              <div className="flex justify-end mb-4">
                <Button startContent={<FaPlus />} onPress={onOpenChange}>
                  Add Episode
                </Button>
              </div>
              <div className="flex flex-col gap-4">
                {anime?.episodeList?.map((ep: any) => (
                  <EpisodeCard
                    key={ep.episodeNumber}
                    anime={anime}
                    episode={ep}
                    customUrl="/anime"
                  />
                ))}
              </div>
              <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                  {(onClose) => (
                    <>
                      <ModalHeader>
                        <h2>Add New Episode</h2>
                      </ModalHeader>
                      <ModalBody>
                        {/* Episode Number Input */}
                        <Input
                          label="Episode Number"
                          type="number"
                          min={1}
                          value={String(episodeNumber)}
                          onChange={(e) =>
                            setEpisodeNumber(Number(e.target.value))
                          }
                        />

                        {/* Episode Title Input */}
                        <Input
                          label="Episode Title"
                          placeholder="Enter episode title"
                          value={episodeTitle}
                          onChange={(e) => setEpisodeTitle(e.target.value)}
                        />

                        {/* Streams Section */}
                        <div className="flex flex-col gap-4 mt-4">
                          {streams.map((stream, index) => (
                            <div key={index} className="flex flex-col gap-2">
                              <h4>Stream {index + 1}</h4>
                              <Input
                                label="Stream URL"
                                placeholder="Enter stream URL"
                                value={stream.url}
                                onChange={(e) =>
                                  handleStreamChange(index, {
                                    ...stream,
                                    url: e.target.value,
                                  })
                                }
                              />
                              <Input
                                label="Stream Label"
                                placeholder="Enter stream label (e.g., Server A)"
                                value={stream.label}
                                onChange={(e) =>
                                  handleStreamChange(index, {
                                    ...stream,
                                    label: e.target.value,
                                  })
                                }
                              />
                              <Input
                                label="Stream Quality"
                                placeholder="Enter stream quality (e.g., 720p)"
                                value={stream.quality}
                                onChange={(e) =>
                                  handleStreamChange(index, {
                                    ...stream,
                                    quality: e.target.value,
                                  })
                                }
                              />
                              <Button
                                color="danger"
                                onPress={() => handleRemoveStream(index)}
                              >
                                Remove Stream
                              </Button>
                            </div>
                          ))}
                        </div>

                        <Button
                          color="primary"
                          onPress={handleAddStream}
                          className="mt-4"
                        >
                          Add Stream
                        </Button>
                      </ModalBody>

                      <ModalFooter>
                        <Button color="secondary" onPress={onClose}>
                          Cancel
                        </Button>
                        <Button color="primary" onPress={handleAddEpisode}>
                          Add Episode
                        </Button>
                      </ModalFooter>
                    </>
                  )}
                </ModalContent>
              </Modal>
            </Tab>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default Page;
