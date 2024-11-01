"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLink = ({ link }) => {
  const pathName = usePathname();

  // Check if the link is external (starts with http or https)
  const isExternal = link.url.startsWith("http");

  // Common styles
  const linkStyles = `rounded-md px-1.5 py-1 font-medium ${
    pathName === link.url && !isExternal ? "bg-black text-white" : ""
  }`;

  if (isExternal) {
    return (
      <Link
        className={linkStyles}
        href={link.url}
        target="_blank"
        rel="noopener noreferrer">
        {link.title}
      </Link>
    );
  }

  return (
    <Link className={linkStyles} href={link.url}>
      {link.title}
    </Link>
  );
};

export default NavLink;
