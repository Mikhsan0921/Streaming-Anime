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
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@nextui-org/react";
import { IoTrashOutline } from "react-icons/io5";
import { FaRegPenToSquare } from "react-icons/fa6";

export default function App() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedGenre, setSelectedGenre] = useState<any | null>(null);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchGenres = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/genre");
      const data = await response.json();
      setGenres(data);
    } catch (error) {
      console.error("Error fetching genres:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGenres();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const formData = new FormData(e.currentTarget as HTMLFormElement);
      const name = formData.get("name") as string;

      const method = selectedGenre?.id ? "PATCH" : "POST";
      const payload = { ...selectedGenre, name };

      const response = await fetch("/api/genre", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(
          `Failed to ${method === "PATCH" ? "update" : "create"} genre`
        );
      }

      alert(
        `Genre ${method === "PATCH" ? "updated" : "created"} successfully!`
      );
      fetchGenres();
      onOpenChange();
    } catch (error) {
      console.error("Error saving genre:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch("/api/genre", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete genre");
      }

      alert("Genre deleted successfully!");
      fetchGenres();
    } catch (error) {
      console.error("Error deleting genre:", error);
    }
  };

  const handleEdit = (genre: any) => {
    setSelectedGenre(genre);
    onOpen();
  };

  const handleCreate = () => {
    setSelectedGenre({ name: "" });
    onOpen();
  };

  const columns = [
    { name: "ID", uid: "id" },
    { name: "NAME", uid: "name" },
    { name: "ACTIONS", uid: "actions" },
  ];

  const renderCell = React.useCallback((genre: any, columnKey: any) => {
    const cellValue = genre[columnKey];

    switch (columnKey) {
      case "actions":
        return (
          <span className="flex flex-row justify-center gap-1">
            <Button isIconOnly onPress={() => handleEdit(genre)}>
              <FaRegPenToSquare />
            </Button>
            <Popover placement="bottom" showArrow={true}>
              <PopoverTrigger>
                <Button color="danger" isIconOnly>
                  <IoTrashOutline />
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <div className="flex flex-col gap-1">
                  <p className="text-sm">
                    Apakah anda yakin ingin menghapus Genre ini ?
                  </p>
                  <div className="flex flex-row justify-end w-full">
                    <Button
                      color="danger"
                      size="sm"
                      startContent={<IoTrashOutline />}
                      onPress={() => handleDelete(genre.id)}
                    >
                      Hapus
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </span>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <div>
      <Button color="primary" onPress={handleCreate} className="mb-4">
        Create New Genre
      </Button>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Table>
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn
                key={column.uid}
                align={column.uid === "actions" ? "center" : "start"}
              >
                {column.name}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody items={genres}>
            {(item: any) => (
              <TableRow key={item.id}>
                {(columnKey) => (
                  <TableCell>{renderCell(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <form onSubmit={handleSave}>
              <ModalHeader className="flex flex-col gap-1">
                {selectedGenre?.id ? "Edit Genre" : "Create Genre"}
              </ModalHeader>
              <ModalBody>
                <Input
                  name="name"
                  label="Name"
                  defaultValue={selectedGenre?.name || ""}
                  required
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
