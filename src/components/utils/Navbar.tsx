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
  DropdownSection,
  User,
} from "@nextui-org/react";
import Theme from "./Theme";
import { usePathname } from "next/navigation";
import { FaUser } from "react-icons/fa6";
import { VscSignOut } from "react-icons/vsc";
import { signOut, useSession } from "next-auth/react";

const NavigationBar = () => {
  const { data: session } = useSession();

  console.log(session?.user);

  const pathname = usePathname();

  const handleLogout = () => {
    signOut();
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
              name={session?.user?.name || "User"}
              description={session?.user?.name || "Role"}
              avatarProps={{
                src: session?.user?.image || "",
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
                  name={session?.user?.name || "User"}
                  description={session?.user?.email || "Email@example.com"}
                  classNames={{
                    name: "capitalize",
                  }}
                  avatarProps={{
                    size: "sm",
                    src: session?.user?.image || "",
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
