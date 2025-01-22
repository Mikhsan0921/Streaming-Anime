"use client";

import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import Link from "next/link";
import AnimeCard from "@/components/ui/AnimeCard";
import { IAnime } from "@/models/Anime";

export default function App() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [animes, setAnimes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAnimes = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/anime");
      const data = await response.json();
      setAnimes(data);
    } catch (error) {
      console.error("Error fetching genres:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnimes();
  }, []);

  const handleCreate = () => {
    onOpen();
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const formData = new FormData(e.currentTarget as HTMLFormElement);

      const response = await fetch("/api/anime", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(
          `Failed to create anime: ${response.status} ${response.statusText}`
        );
      }

      alert(`Anime created successfully!`);
      fetchAnimes();
      onOpenChange();
    } catch (error) {
      console.error("Error saving anime:", error);
    }
  };

  return (
    <div className="viewport-container">
      <div className="flex flex-row gap-2 mb-4">
        <Link href="anime/sync">
          <Button>Sync Anime</Button>
        </Link>
        <Button color="primary" onPress={handleCreate}>
          Add New Anime
        </Button>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <p>{animes.length}</p>
          <div className="flex flex-wrap gap-4">
            {animes.length > 0 ? (
              animes.map((anime: IAnime) => (
                <AnimeCard
                  key={anime.id}
                  type="anime"
                  anime={anime}
                  customUrl="/manage/anime"
                />
              ))
            ) : (
              <p>No results found</p>
            )}
          </div>
        </div>
      )}

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <form onSubmit={handleSave}>
              <ModalHeader className="flex flex-col gap-1">
                Create Anime
              </ModalHeader>
              <ModalBody>
                <p>test</p>
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
    </div>
  );
}
