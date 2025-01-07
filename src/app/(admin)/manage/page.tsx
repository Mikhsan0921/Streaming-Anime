import { GiKatana } from "react-icons/gi";
import { FaTags, FaUser } from "react-icons/fa";
import Link from "next/link";
import { FaClapperboard } from "react-icons/fa6";

const Page = () => {
  const path = [
    {
      name: "Anime",
      url: "/anime",
      icon: GiKatana,
    },
    {
      name: "Genre",
      url: "/genre",
      icon: FaTags,
    },
    {
      name: "Studio",
      url: "/studio",
      icon: FaClapperboard,
    },
    {
      name: "User",
      url: "/user",
      icon: FaUser,
    },
  ];

  return (
    <div className="viewport-container">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        {path.map((item, index) => (
          <Link
            key={index}
            className="bg-primary p-6 rounded flex flex-col justify-center items-center gap-2 hover:scale-105 transition"
            href={`/manage${item.url}`}
          >
            <item.icon size={50} />
            <p className="font-bold">{item.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Page;
