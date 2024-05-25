import Link from "next/link";
import { FaHome, FaUser, FaCommentDots } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";

export default function Header() {

    const navMenu = [
        { name: "Acceuil", icon: FaHome, path: "/" },
        { name: "Comment", icon: FaCommentDots, path: "/dashboard/comment" },
        { name: "Contact", icon: IoIosMail, path: "/dashboard/contact" },
        { name: "Login", icon: FaUser, path: "/dashboard" },
      ];

  return (
    <header className="flex items-center gap-3 p-3 h-[60px] w-full bg-gray-800 text-white">
        <nav className="flex items-center h-full w-full">
            <ul className="flex w-full justify-around text-sm sm:text-xl md:text-2xl">
                {navMenu.map((items) => (
                    <li key={items.name} >
                        <Link href={items.path} className="flex items-center md:gap-1 text-white hover:text-yellow-200">
                            <items.icon />
                            <span>{items.name}</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    </header>
  )
}
