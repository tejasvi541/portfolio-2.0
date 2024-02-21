"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const Homepage = () => {
  return (
    <motion.div
      className="h-full"
      initial={{ y: "-200vh" }}
      animate={{ y: "0%" }}
      transition={{ duration: 1 }}>
      <div className="h-full flex flex-col lg:flex-row px-4 sm:px-8 md:px-12 lg:px-20 xl:px-48">
        {/* IMAGE CONTAINER */}
        <div className="h-1/2 lg:h-full lg:w-1/2 relative">
          <Image src="/hero.png" alt="" fill className="object-contain" />
        </div>
        {/* TEXT CONTAINER */}
        <div className="h-1/2 lg:h-full lg:w-1/2 flex flex-col gap-8 items-center justify-center">
          {/* TITLE */}
          <h1 className="text-4xl md:text-6xl font-bold">
            Full-Stack Developer, Machine Learning Engineer
          </h1>
          {/* DESC */}
          <p className="md:text-xl">
            Ongoing Master&rsquo;s studies @Concordia complemented by Bachelor
            of Technology in Computer Science. Proficient in Python, JavaScript,
            and Java, with expertise in React.js, Next.js, Node.js and Django
            for web development. Skilled in AI and Machine learning with
            practical experience in Pytorch, TensorFlow, and Keras. Strong
            communicator and quick learner, poised to make meaningful
            contributions to any team. Passionate about driving innovation in
            the tech industry.
          </p>
          {/* BUTTONS */}
          <div className="w-full flex gap-4">
            <button className="p-4 rounded-lg ring-2 ring-black bg-black text-white font-medium">
              View My Work
            </button>
            <button className="p-4 rounded-lg ring-2 ring-black font-medium">
              Contact Me
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Homepage;
