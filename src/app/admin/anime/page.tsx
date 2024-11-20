"use client";

import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Textarea,
  SelectItem,
  Select,
} from "@nextui-org/react";
import { IoTrashOutline } from "react-icons/io5";
import { FaRegPenToSquare } from "react-icons/fa6";
import Image from "next/image";
import { s } from "framer-motion/client";

export default function App() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedAnime, setSelectedAnime] = useState<any | null>(null);
  const [animeList, setAnimeList] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch all anime on component mount
  useEffect(() => {
    const fetchAnime = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/anime");
        const data = await response.json();
        setAnimeList(data.data);
      } catch (error) {
        console.error("Error fetching anime:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAnime();
  }, []);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/genre");
        const data = await response.json();
        setGenres(data.data);
      } catch (error) {
        console.error("Error fetching genres:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchGenres();
  }, []);

  useEffect(() => {
    console.log("Selected Anime:", selectedAnime);
  }, [selectedAnime]);

  // Handle edit button click
  const handleEdit = (anime: any) => {
    setSelectedAnime({
      ...anime,
      genres: anime.genres ? anime.genres.split(",") : [],
    });
    onOpen();
  };

  // Handle create button click
  const handleCreate = () => {
    setSelectedAnime({
      judul: "",
      sub_judul: "",
      status: "",
      released: "",
      deskripsi: "",
      thumbnail: "",
      banner: "",
      genres: [],
    });
    onOpen();
  };

  // Handle form submission
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const method = selectedAnime?.id_anime ? "PUT" : "POST";
      const response = await fetch("/api/anime", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(selectedAnime),
      });

      if (response.ok) {
        alert(
          `Anime ${method === "POST" ? "created" : "updated"} successfully!`
        );
        onOpenChange();
        const fetchResponse = await fetch("/api/anime");
        const data = await fetchResponse.json();
        setAnimeList(data.data);
      } else {
        throw new Error("Error saving anime");
      }
    } catch (error) {
      console.error("Error saving anime:", error);
    }
  };

  // Handle file input and convert to base64
  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedAnime((prev: any) => ({
          ...prev,
          [field]: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle delete action
  const handleDelete = async (id_anime: number) => {
    try {
      const response = await fetch("/api/anime", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id_anime }),
      });

      if (response.ok) {
        alert("Anime deleted successfully!");
        setAnimeList(
          animeList.filter((anime: any) => anime.id_anime !== id_anime)
        );
      } else {
        throw new Error("Error deleting anime");
      }
    } catch (error) {
      console.error("Error deleting anime:", error);
    }
  };

  return (
    <>
      <Button color="primary" onPress={handleCreate} className="mb-4">
        Create New Anime
      </Button>

      <Table>
        <TableHeader>
          <TableColumn>ID</TableColumn>
          <TableColumn>Title</TableColumn>
          <TableColumn>Status</TableColumn>
          <TableColumn>Released</TableColumn>
          <TableColumn>Thumbnail</TableColumn>
          <TableColumn>Banner</TableColumn>
          <TableColumn>Actions</TableColumn>
        </TableHeader>
        <TableBody>
          {animeList?.map((anime: any) => (
            <TableRow key={anime.id_anime}>
              <TableCell>{anime.id_anime}</TableCell>
              <TableCell>{anime.judul}</TableCell>
              <TableCell>
                {anime.status == "0"
                  ? "Soon"
                  : anime.status == "1"
                  ? "Ongoing"
                  : anime.status == "2"
                  ? "Finished"
                  : "Unknown"}
              </TableCell>
              <TableCell>{anime.released}</TableCell>
              <TableCell>
                <Image
                  src={anime.thumbnail}
                  alt={anime.judul}
                  width={50}
                  height={50}
                />
              </TableCell>
              <TableCell>
                <Image
                  src={anime.banner}
                  alt={anime.judul}
                  width={50}
                  height={50}
                />
              </TableCell>
              <TableCell>
                <span className="flex flex-row gap-1">
                  <Button isIconOnly onPress={() => handleEdit(anime)}>
                    <FaRegPenToSquare />
                  </Button>
                  <Button
                    color="danger"
                    isIconOnly
                    onPress={() => handleDelete(anime.id_anime)}
                  >
                    <IoTrashOutline />
                  </Button>
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {selectedAnime && (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <form onSubmit={handleSave}>
                <ModalHeader className="flex flex-col gap-1">
                  {selectedAnime.id_anime ? "Edit Anime" : "Create Anime"}
                </ModalHeader>
                <ModalBody>
                  <Input
                    label="Title"
                    value={selectedAnime.judul}
                    onChange={(e) =>
                      setSelectedAnime({
                        ...selectedAnime,
                        judul: e.target.value,
                      })
                    }
                  />
                  <Input
                    label="Subtitle"
                    value={selectedAnime.sub_judul}
                    onChange={(e) =>
                      setSelectedAnime({
                        ...selectedAnime,
                        sub_judul: e.target.value,
                      })
                    }
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <Select
                      label="Status"
                      onChange={(e) =>
                        setSelectedAnime({
                          ...selectedAnime,
                          status: e.target.value,
                        })
                      }
                    >
                      <SelectItem key="0" value={0}>
                        Soon
                      </SelectItem>
                      <SelectItem key="1" value={1}>
                        Ongoing
                      </SelectItem>
                      <SelectItem key="2" value={2}>
                        Finished
                      </SelectItem>
                    </Select>

                    <Input
                      label="Released"
                      value={selectedAnime.released}
                      onChange={(e) =>
                        setSelectedAnime({
                          ...selectedAnime,
                          released: e.target.value,
                        })
                      }
                    />
                  </div>
                  <Select
                    label="Genre"
                    placeholder="Select some genres"
                    selectionMode="multiple"
                    selectedKeys={selectedAnime.genres}
                    onSelectionChange={(keys) => {
                      setSelectedAnime({
                        ...selectedAnime,
                        genres: Array.from(keys),
                      });
                    }}
                  >
                    {genres.map((genre: any) => (
                      <SelectItem key={genre.label} value={genre.id}>
                        {genre.label}
                      </SelectItem>
                    ))}
                  </Select>
                  <Textarea
                    label="Description"
                    value={selectedAnime.deskripsi}
                    onChange={(e) =>
                      setSelectedAnime({
                        ...selectedAnime,
                        deskripsi: e.target.value,
                      })
                    }
                  />
                  <Input
                    label="Thumbnail"
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, "thumbnail")}
                  />
                  <Input
                    label="Banner"
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, "banner")}
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button color="primary" type="submit">
                    Save
                  </Button>
                </ModalFooter>
              </form>
            )}
          </ModalContent>
        </Modal>
      )}
    </>
  );
}
