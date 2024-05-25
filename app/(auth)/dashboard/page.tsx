import Link from "next/link";
import { FaCommentDots } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";

export default function Dashboard() {

  const dashboardMenu = [
    { name: "Comment", icon: FaCommentDots, path: "/dashboard/comment" },
    { name: "Contact", icon: IoIosMail, path: "/dashboard/contact" },
  ];

    return (
      <main className="flex flex-col items-center h-full w-full">
        
        <nav className="flex flex-col items-center h-full w-full bg-black text-white">
          <h1 className="text-4xl font-bold">Dashboard</h1>
          <ul className="flex w-full justify-around text-sm sm:text-xl md:text-2xl">
              {dashboardMenu.map((items) => (
                  <li key={items.name} >
                      <Link href={items.path} className="flex items-center md:gap-1 text-white hover:text-yellow-200">
                          <items.icon />
                          <span>{items.name}</span>
                      </Link>
                  </li>
              ))}
          </ul>
        </nav>
      </main>
    );
  }
