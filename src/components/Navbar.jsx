"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import NavLink from "./NavLink.jsx";
import { motion } from "framer-motion";

const links = [
  { url: "/", title: "Home" },
  { url: "/about", title: "About" },
  { url: "/portfolio", title: "Portfolio" },
  { url: "/contact", title: "Contact" },
  {
    url: "https://www.dropbox.com/scl/fi/2ocu8ompjf6v5374r1xgr/Resume_Tejasvi_Tech.pdf?rlkey=cyifgx9ii3tuulz7stxkh0sma&dl=0",
    title: "Resume",
  },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const topVariants = {
    closed: {
      rotate: 0,
    },
    opened: {
      rotate: 45,
      backgroundColor: "rgb(255,255,255)",
    },
  };
  const centerVariants = {
    closed: {
      opacity: 1,
    },
    opened: {
      opacity: 0,
    },
  };

  const bottomVariants = {
    closed: {
      rotate: 0,
    },
    opened: {
      rotate: -45,
      backgroundColor: "rgb(255,255,255)",
    },
  };

  const listVariants = {
    closed: {
      x: "100vw",
    },
    opened: {
      x: 0,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2,
      },
    },
  };

  const listItemVariants = {
    closed: {
      x: -10,
      opacity: 0,
    },
    opened: {
      x: 0,
      opacity: 1,
    },
  };

  return (
    <div className="h-full flex items-center justify-between px-4 sm:px-8 md:px-12 lg:px-20 xl:px-48 text-xl">
      {/* LINKS */}
      <div className="hidden md:flex gap-4 w-1/3">
        {links.map((link) => (
          <NavLink link={link} key={link.title} />
        ))}
      </div>
      {/* LOGO */}
      <div className="md:hidden lg:flex xl:w-1/3 xl:justify-center">
        <Link
          href="/"
          className="text-sm bg-black rounded-md p-1 font-semibold flex items-center justify-center">
          <span className="text-white mr-1">Tejasvi</span>
          <span className="w-12 h-8 rounded bg-white text-black flex items-center justify-center">
            .co
          </span>
        </Link>
      </div>
      {/* SOCIAL */}
      <div className="hidden md:flex gap-5 w-1/3">
        <Link
          href="https://github.com/tejasvi541/"
          rel="noopener noreferrer"
          target="_blank">
          <Image src="/github.png" alt="" width={32} height={32} />
        </Link>
        <Link
          href="https://www.linkedin.com/in/t3jasvi/"
          rel="noopener noreferrer"
          target="_blank">
          <Image src="/linkedin.png" alt="" width={30} height={30} />
        </Link>
        <Link
          href="https://www.instagram.com/tejasvi.__/"
          rel="noopener noreferrer"
          target="_blank">
          <Image src="/instagram.png" alt="" width={30} height={30} />
        </Link>
        <Link
          href="https://twitter.com/weinsimulation"
          rel="noopener noreferrer"
          target="_blank">
          <Image src="/x.png" alt="" width={30} height={30} />
        </Link>
        <Link
          href="https://www.facebook.com/t3jasv"
          rel="noopener noreferrer"
          target="_blank">
          <Image src="/facebook.png" alt="" width={30} height={30} />
        </Link>
      </div>
      {/* RESPONSIVE MENU */}
      <div className="md:hidden">
        {/* MENU BUTTON */}
        <button
          className="w-10 h-8 flex flex-col justify-between z-50 relative "
          onClick={() => setOpen((prev) => !prev)}>
          <motion.div
            variants={topVariants}
            animate={open ? "opened" : "closed"}
            className="w-10 h-1 bg-black rounded-xl origin-left "></motion.div>
          <motion.div
            variants={centerVariants}
            animate={open ? "opened" : "closed"}
            className="w-10 h-1 bg-black rounded-xl"></motion.div>
          <motion.div
            variants={bottomVariants}
            animate={open ? "opened" : "closed"}
            className="w-10 h-1 bg-black rounded-xl origin-left"></motion.div>
        </button>
        {/* MENU LIST */}
        {open && (
          <motion.div
            variants={listVariants}
            initial="closed"
            animate="opened"
            className="absolute font-bold top-0 left-0 w-screen h-screen bg-slate-500 text-white flex flex-col items-center justify-center gap-8 text-2xl z-40">
            {links.map((link) => (
              <motion.div
                variants={listItemVariants}
                className=""
                key={link.title}>
                {link.title !== "Resume" ? (
                  <Link href={link.url}>{link.title}</Link>
                ) : (
                  <Link
                    rel="noopener noreferrer"
                    target="_blank"
                    href={link.url}>
                    {link.title}
                  </Link>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
