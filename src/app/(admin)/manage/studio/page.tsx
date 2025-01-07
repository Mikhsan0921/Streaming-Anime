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

export default function StudioManagement() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedStudio, setSelectedStudio] = useState<any | null>(null);
  const [studios, setStudios] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStudios = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/studio");
      const data = await response.json();
      setStudios(data);
    } catch (error) {
      console.error("Error fetching studios:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudios();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const formData = new FormData(e.currentTarget as HTMLFormElement);
      const name = formData.get("name") as string;

      const method = selectedStudio?.id ? "PATCH" : "POST";
      const payload = { ...selectedStudio, name };

      const response = await fetch("/api/studio", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(
          `Failed to ${method === "PATCH" ? "update" : "create"} studio`
        );
      }

      alert(
        `Studio ${method === "PATCH" ? "updated" : "created"} successfully!`
      );
      fetchStudios();
      onOpenChange();
    } catch (error) {
      console.error("Error saving studio:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch("/api/studio", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete studio");
      }

      alert("Studio deleted successfully!");
      fetchStudios();
    } catch (error) {
      console.error("Error deleting studio:", error);
    }
  };

  const handleEdit = (studio: any) => {
    setSelectedStudio(studio);
    onOpen();
  };

  const handleCreate = () => {
    setSelectedStudio({ name: "" });
    onOpen();
  };

  const columns = [
    { name: "ID", uid: "id" },
    { name: "NAME", uid: "name" },
    { name: "ACTIONS", uid: "actions" },
  ];

  const renderCell = React.useCallback((studio: any, columnKey: any) => {
    const cellValue = studio[columnKey];

    switch (columnKey) {
      case "actions":
        return (
          <span className="flex flex-row justify-center gap-1">
            <Button isIconOnly onPress={() => handleEdit(studio)}>
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
                    Are you sure you want to delete this Studio?
                  </p>
                  <div className="flex flex-row justify-end w-full">
                    <Button
                      color="danger"
                      size="sm"
                      startContent={<IoTrashOutline />}
                      onPress={() => handleDelete(studio.id)}
                    >
                      Delete
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
    <div className="viewport-container">
      <Button color="primary" onPress={handleCreate} className="mb-4">
        Create New Studio
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
          <TableBody items={studios}>
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
                {selectedStudio?.id ? "Edit Studio" : "Create Studio"}
              </ModalHeader>
              <ModalBody>
                <Input
                  name="name"
                  label="Name"
                  defaultValue={selectedStudio?.name || ""}
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
