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
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
} from "@nextui-org/react";
import { IoTrashOutline } from "react-icons/io5";
import { FaRegPenToSquare } from "react-icons/fa6";

export default function App() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedGenre, setSelectedGenre] = useState<any | null>(null);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(false);

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

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (selectedGenre?.id_genre) {
        const response = await fetch("/api/genre", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id_genre: selectedGenre.id_genre,
            label: selectedGenre.label,
          }),
        });

        if (response.ok) {
          alert("Genre updated successfully!");
        } else {
          throw new Error("Error updating genre");
        }
      } else {
        const response = await fetch("/api/genre", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ label: selectedGenre.label }),
        });

        if (response.ok) {
          alert("Genre created successfully!");
        } else {
          throw new Error("Error creating genre");
        }
      }

      const fetchGenres = await fetch("/api/genre");
      const data = await fetchGenres.json();
      setGenres(data.data);
      onOpenChange();
    } catch (error) {
      console.error("Error saving genre:", error);
    }
  };

  const handleDelete = async (id_genre: number) => {
    try {
      const response = await fetch("/api/genre", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id_genre }),
      });

      if (response.ok) {
        alert("Genre deleted successfully!");
        setGenres(genres.filter((genre: any) => genre.id_genre !== id_genre));
      } else {
        throw new Error("Error deleting genre");
      }
    } catch (error) {
      console.error("Error deleting genre:", error);
    }
  };

  const handleEdit = (genre: any) => {
    setSelectedGenre(genre);
    onOpen();
  };

  const handleCreate = () => {
    setSelectedGenre({ label: "" });
    onOpen();
  };

  return (
    <div>
      <Button color="primary" onPress={handleCreate} className="mb-4">
        Create New Genre
      </Button>

      <Table>
        <TableHeader>
          <TableColumn>ID</TableColumn>
          <TableColumn>Label</TableColumn>
          <TableColumn>Actions</TableColumn>
        </TableHeader>
        <TableBody emptyContent="No genres found">
          {genres.map((genre: any) => (
            <TableRow key={genre.id_genre}>
              <TableCell>{genre.id_genre}</TableCell>
              <TableCell>{genre.label}</TableCell>
              <TableCell>
                <Button
                  variant="light"
                  onPress={() => handleEdit(genre)}
                  startContent={<FaRegPenToSquare />}
                >
                  Edit
                </Button>
                <Button
                  color="danger"
                  variant="light"
                  onPress={() => handleDelete(genre.id_genre)}
                  startContent={<IoTrashOutline />}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <form onSubmit={handleSave}>
              <ModalHeader className="flex flex-col gap-1">
                {selectedGenre?.id_genre ? "Edit Genre" : "Create Genre"}
              </ModalHeader>
              <ModalBody>
                <Input
                  label="Label"
                  value={selectedGenre?.label || ""}
                  onChange={(e) =>
                    setSelectedGenre({
                      ...selectedGenre,
                      label: e.target.value,
                    })
                  }
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
    </div>
  );
}
