"use client";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  DropdownSection,
  User,
} from "@nextui-org/react";
import Theme from "./Theme";
import { useAuthContext } from "../providers/auth";
import { usePathname, useRouter } from "next/navigation";
import { FaUser } from "react-icons/fa6";
import { VscSignOut } from "react-icons/vsc";

const NavigationBar = () => {
  const { userProfile: user } = useAuthContext();

  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    document.cookie =
      "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    router.push("/auth/login");
  };

  return (
    <Navbar>
      <NavbarBrand>
        <Link href="/">
          <p className="font-bold text-inherit">ANIMEKU</p>
        </Link>
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {[
          { href: "/admin/anime", label: "Anime" },
          { href: "/admin/genre", label: "Genre" },
          { href: "/about", label: "About" },
        ].map((item) => (
          <NavbarItem key={item.href}>
            <Link
              color={pathname === item.href ? "secondary" : "foreground"}
              href={item.href}
            >
              {item.label}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent as="div" justify="end">
        <Dropdown
          radius="sm"
          classNames={{
            base: "before:bg-default-200",
            content: "p-0",
          }}
        >
          <DropdownTrigger className="flex items-center justify-center">
            <User
              as="button"
              name={user?.username || "User"}
              description={user?.role || "Role"}
              avatarProps={{
                src: user?.image,
                showFallback: true,
                size: "sm",
                className: "hover:opacity-50 transition-opacity",
              }}
              classNames={{
                name: "text-xs capitalize",
                description: "text-[0.65rem]",
              }}
            />
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Custom item styles"
            disabledKeys={["user"]}
            className="p-3"
            itemClasses={{
              base: [
                "rounded-md",
                "transition-opacity",
                "data-[hover=true]:text-foreground",
                "data-[hover=true]:bg-default-100",
                "dark:data-[hover=true]:bg-default-50",
                "data-[selectable=true]:focus:bg-default-50",
                "data-[pressed=true]:opacity-70",
                "data-[focus-visible=true]:ring-default-500",
              ],
            }}
          >
            <DropdownSection aria-label="User" showDivider>
              <DropdownItem
                isReadOnly
                key="user"
                className="h-14 gap-2 opacity-100"
                textValue="User Information"
              >
                <User
                  name={user?.username || "User"}
                  description={user?.email || "Email@example.com"}
                  classNames={{
                    name: "capitalize",
                  }}
                  avatarProps={{
                    size: "sm",
                    src: user?.image,
                  }}
                />
              </DropdownItem>
              <DropdownItem
                key="profile"
                href="/profile"
                startContent={<FaUser />}
                textValue="Profile"
              >
                Profile
              </DropdownItem>
            </DropdownSection>
            <DropdownSection aria-label="Settings" showDivider>
              <DropdownItem
                isReadOnly
                key="theme"
                endContent={<Theme />}
                textValue="Tema"
              >
                Tema
              </DropdownItem>
            </DropdownSection>
            <DropdownSection aria-label="Help & Feedback">
              <DropdownItem
                key="logout"
                startContent={<VscSignOut />}
                onClick={() => handleLogout()}
                textValue="Log Out"
              >
                Log Out
              </DropdownItem>
            </DropdownSection>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
};

export default NavigationBar;
