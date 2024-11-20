"use client";

import { useEffect, useState } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { useTheme } from "next-themes";
import { FaCircleHalfStroke } from "react-icons/fa6";
import { LuMoonStar, LuSun } from "react-icons/lu";

const Theme: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="light" isIconOnly size="sm">
          {theme === "light" ? <LuSun size={18} /> : <LuMoonStar size={18} />}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        variant="faded"
        aria-label="Change theme"
        onAction={(key) => setTheme(key as string)}
      >
        <DropdownItem key="light" startContent={<LuSun />}>
          Light
        </DropdownItem>
        <DropdownItem key="dark" startContent={<LuMoonStar />}>
          Dark
        </DropdownItem>
        <DropdownItem key="system" startContent={<FaCircleHalfStroke />}>
          Auto
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default Theme;
