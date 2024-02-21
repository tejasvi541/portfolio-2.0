"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLink = ({ link }) => {
  const pathName = usePathname();

  return (
    <Link
      className={`rounded-md px-1.5 py-1 font-medium ${
        pathName === link.url && "bg-black text-white"
      }`}
      href={link.url}>
      {link.title}
    </Link>
  );
};

export default NavLink;
