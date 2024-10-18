"use client";
import Brain from "@/components/Brain";
import { motion, useInView, useScroll } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

const AboutPage = () => {
  const containerRef = useRef();
  const { scrollYProgress } = useScroll({ container: containerRef });

  const skillRef = useRef();
  const isSkillRefInView = useInView(skillRef, { margin: "-100px" });

  const experienceRef = useRef();
  const isExperienceRefInView = useInView(experienceRef, { margin: "-100px" });

  return (
    <motion.div
      className="h-full overflow-hidden"
      initial={{ y: "-300vh" }}
      animate={{ y: "0%" }}
      transition={{ duration: 1 }}>
      {/* CONTAINER */}
      <div className="h-full overflow-y-scroll lg:flex" ref={containerRef}>
        {/* TEXT CONTAINER */}
        <div className="p-4 sm:p-6 md:p-8 lg:p-16 xl:p-24 flex flex-col gap-12 md:gap-16 lg:gap-20 xl:gap-24 lg:w-2/3 lg:pr-0 xl:w-1/2">
          {/* BIOGRAPHY CONTAINER */}
          <div className="flex flex-col gap-6 justify-center">
            {/* BIOGRAPHY IMAGE */}
            <Image
              src="/bio.png"
              alt="Biography Image"
              width={112}
              height={112}
              className="w-28 h-28 rounded-full object-cover mb-4 sm:w-32 sm:h-32 lg:w-40 lg:h-40"
            />
            {/* BIOGRAPHY TITLE */}
            <h1 className="font-bold text-2xl sm:text-3xl lg:text-4xl">
              BIOGRAPHY
            </h1>
            {/* BIOGRAPHY DESCRIPTION */}
            <p className="text-base sm:text-lg lg:text-xl leading-relaxed">
              Ongoing Master&rsquo;s studies @Concordia complemented by a
              Bachelor of Technology in Computer Science. Proficient in Python,
              JavaScript, and Java, with expertise in React.js, Next.js,
              Node.js, and Django for web development. Skilled in AI and Machine
              Learning with practical experience in Pytorch, TensorFlow, and
              Keras. Strong communicator and quick learner, poised to make
              meaningful contributions to any team. Passionate about driving
              innovation in the tech industry.
            </p>
            {/* BIOGRAPHY QUOTE */}
            <span className="italic mt-4 text-sm sm:text-base lg:text-lg">
              Innovation distinguishes between a leader and a follower.
            </span>
            {/* BIOGRAPHY SIGN SVG */}
            <div className="self-end mt-4">
              {/* SVG SIGNATURE */}
              <svg
                version="1.0"
                xmlns="http://www.w3.org/2000/svg"
                width="300.000000pt"
                height="217.000000pt"
                viewBox="0 0 300.000000 217.000000"
                preserveAspectRatio="xMidYMid meet">
                <metadata>
                  Created by potrace 1.10, written by Peter Selinger 2001-2011
                </metadata>
                <g
                  transform="translate(0.000000,217.000000) scale(0.100000,-0.100000)"
                  fill="#000000"
                  stroke="none">
                  <path
                    d="M1331 1994 c-40 -51 -92 -274 -121 -523 l-13 -103 -61 -28 c-82 -38
-161 -60 -281 -79 -74 -12 -100 -21 -100 -31 0 -12 14 -15 70 -13 87 2 201 31
300 77 72 33 75 34 70 13 -10 -43 -25 -241 -37 -486 -15 -316 0 -565 47 -758
3 -13 13 -23 21 -23 12 0 14 5 9 18 -63 149 -71 534 -23 1130 l12 153 45 34
c52 38 117 104 150 152 80 117 80 332 1 461 -25 40 -60 43 -89 6z m95 -108
c13 -36 19 -76 19 -136 -1 -126 -27 -184 -127 -284 -43 -43 -81 -77 -83 -74
-5 5 28 209 50 313 19 83 63 232 77 259 10 19 11 18 28 -4 9 -12 25 -46 36
-74z"
                  />
                  <path
                    d="M2107 1613 c-25 -25 12 -64 40 -42 11 10 11 15 -3 30 -18 20 -27 23
-37 12z"
                  />
                  <path
                    d="M2125 1450 c-14 -43 14 -244 31 -227 4 3 8 60 10 126 3 114 3 121
-15 121 -11 0 -23 -9 -26 -20z"
                  />
                  <path
                    d="M2067 1433 c-3 -10 -13 -60 -22 -110 -10 -51 -21 -93 -24 -93 -4 0
-12 37 -19 82 -13 87 -24 110 -44 90 -15 -15 16 -188 38 -221 22 -31 49 -12
68 46 22 69 47 195 42 210 -8 19 -34 16 -39 -4z"
                  />
                  <path
                    d="M1850 1345 c-5 -14 -10 -33 -10 -41 0 -31 -32 -170 -45 -194 -12 -23
-14 -24 -21 -6 -4 11 -2 52 5 93 7 40 10 77 7 81 -3 5 -23 9 -46 10 -35 2 -43
-2 -59 -29 -10 -17 -24 -52 -31 -77 -7 -26 -32 -92 -55 -147 -24 -55 -47 -111
-51 -125 -6 -17 -12 32 -19 150 -8 148 -12 175 -26 178 -9 2 -19 -5 -23 -14
-4 -10 1 -107 11 -215 l17 -198 -25 -93 c-30 -114 -35 -326 -9 -352 40 -41 58
48 59 290 1 137 8 170 81 357 23 58 33 68 44 42 8 -23 42 -18 64 10 23 29 32
32 32 10 0 -21 24 -29 49 -16 22 12 54 102 66 187 9 60 16 74 26 48 13 -34 10
-96 -6 -108 -8 -6 -16 -29 -18 -51 -2 -35 1 -40 21 -43 18 -3 26 4 37 32 33
78 5 237 -43 244 -16 3 -25 -4 -32 -23z m-118 -162 c-8 -61 -33 -113 -54 -113
-16 0 -3 91 22 147 28 63 43 47 32 -34z m-231 -653 l-8 -95 -1 95 c-1 52 2
106 6 120 l7 25 3 -25 c1 -14 -2 -68 -7 -120z"
                  />
                  <path
                    d="M1303 1118 c-43 -46 -69 -149 -53 -209 10 -37 48 -69 81 -69 24 0 99
42 110 61 18 34 -1 40 -32 10 -16 -16 -43 -33 -61 -36 -41 -10 -68 20 -68 76
0 36 2 38 19 27 45 -28 107 67 85 130 -13 36 -52 41 -81 10z m36 -94 c-13 -16
-35 -18 -44 -4 -7 11 9 45 34 74 15 17 16 17 19 -19 2 -20 -2 -43 -9 -51z"
                  />
                </g>
              </svg>
            </div>
            {/* BIOGRAPHY SCROLL SVG */}
            <motion.svg
              initial={{ opacity: 0.2, y: 0 }}
              animate={{ opacity: 1, y: "10px" }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              width={50}
              height={50}
              className="mx-auto mt-8 hidden sm:block">
              <path
                d="M5 15C5 16.8565 5.73754 18.6371 7.05029 19.9498C8.36305 21.2626 10.1435 21.9999 12 21.9999C13.8565 21.9999 15.637 21.2626 16.9498 19.9498C18.2625 18.6371 19 16.8565 19 15V9C19 7.14348 18.2625 5.36305 16.9498 4.05029C15.637 2.73754 13.8565 2 12 2C10.1435 2 8.36305 2.73754 7.05029 4.05029C5.73754 5.36305 5 7.14348 5 9V15Z"
                stroke="#000000"
                strokeWidth="1"
              />
              <path d="M12 6V14" stroke="#000000" strokeWidth="1" />
              <path d="M15 11L12 14L9 11" stroke="#000000" strokeWidth="1" />
            </motion.svg>
          </div>
          {/* SKILLS CONTAINER */}
          <div className="flex flex-col gap-8 justify-center" ref={skillRef}>
            {/* SKILL TITLE */}
            <motion.h1
              initial={{ x: "-300px" }}
              animate={isSkillRefInView ? { x: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="font-bold text-2xl sm:text-3xl lg:text-4xl">
              SKILLS
            </motion.h1>
            {/* SKILL LIST */}
            <motion.div
              initial={{ x: "-300px" }}
              animate={isSkillRefInView ? { x: 0 } : {}}
              className="flex gap-4 flex-wrap">
              {/* Skill Badges */}
              {[
                "Python",
                "JavaScript",
                "Typescript",
                "Go",
                "Java",
                "C++",
                "Erlang",
                "Next js",
                "React js",
                "Node js",
                "Express js",
                "Django",
                "Flask",
                "Tailwind CSS",
                "RAG",
                "Pytorch",
                "Tensorflow",
                "Keras",
                "OpenCV",
                "Seaborn",
                "MySQL",
                "MongoDB",
                "Redis",
                "Zookeeper",
                "Kafka",
                "AWS",
                "Docker",
                "Kubernetes",
                "Jenkins",
                "Grafana",
                "Prometheus",
                "Git",
                "Jira",
              ].map((skill) => (
                <div
                  key={skill}
                  className="rounded p-2 text-xs sm:text-sm lg:text-base cursor-pointer bg-black text-white hover:bg-white hover:text-black transition-colors duration-300">
                  {skill}
                </div>
              ))}
            </motion.div>
          </div>
          {/* EXPERIENCE CONTAINER */}
          <div
            className="flex flex-col gap-8 justify-center"
            ref={experienceRef}>
            {/* EXPERIENCE TITLE */}
            <motion.h1
              initial={{ x: "-310px" }}
              animate={isExperienceRefInView ? { x: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="font-bold text-2xl sm:text-3xl lg:text-4xl">
              EXPERIENCE & EDUCATION
            </motion.h1>
            {/* EXPERIENCE LIST */}
            <motion.div
              initial={{ x: "-300px" }}
              animate={isExperienceRefInView ? { x: 0 } : {}}
              className="flex flex-col gap-8 mb-20">
              {/* EXPERIENCE LIST ITEM */}
              <div className="flex justify-between">
                {/* LEFT */}
                <div className="w-1/3"></div>
                {/* CENTER */}
                <div className="w-1/6 flex justify-center">
                  {/* LINE */}
                  <div className="w-1 h-full bg-gray-600 rounded relative">
                    {/* LINE CIRCLE */}
                    <div className="absolute w-5 h-5 rounded-full ring-4 ring-red-400 bg-white -left-2"></div>
                  </div>
                </div>
                {/* RIGHT */}
                <div className="w-1/3">
                  {/* JOB TITLE */}
                  <div className="bg-white p-3 font-semibold rounded-b-lg rounded-s-lg">
                    Concordia University
                  </div>
                  {/* JOB DESCRIPTION */}
                  <div className="p-3 text-sm italic">
                    Delivered instruction on advanced Java topics: inheritance,
                    polymorphism, abstract classes, and interfaces. • Conducted
                    hands-on lab sessions
                  </div>
                  {/* JOB DATE */}
                  <div className="p-3 text-red-400 text-sm font-semibold">
                    2024 - 2024
                  </div>
                  {/* JOB COMPANY */}
                  <div className="p-1 rounded bg-white text-sm font-semibold w-fit">
                    Teaching Assistant
                  </div>
                </div>
              </div>
              {/* EXPERIENCE LIST ITEM */}
              <div className="flex justify-between">
                {/* LEFT */}
                <div className="w-1/3">
                  {/* JOB TITLE */}
                  <div className="bg-white p-3 font-semibold rounded-b-lg rounded-s-lg">
                    Concordia University
                  </div>
                  {/* JOB DESCRIPTION */}
                  <div className="p-3 text-sm italic">
                    Masters Applied in Computer Science GPA - 3.8/4.3
                  </div>
                  {/* JOB DATE */}
                  <div className="p-3 text-red-400 text-sm font-semibold">
                    2024 - 2025 (Expected)
                  </div>
                  {/* JOB COMPANY */}
                  <div className="p-1 rounded bg-white text-sm font-semibold w-fit">
                    Student
                  </div>
                </div>
                {/* CENTER */}
                <div className="w-1/6 flex justify-center">
                  {/* LINE */}
                  <div className="w-1 h-full bg-gray-600 rounded relative">
                    {/* LINE CIRCLE */}
                    <div className="absolute w-5 h-5 rounded-full ring-4 ring-red-400 bg-white -left-2"></div>
                  </div>
                </div>
                {/* RIGHT */}
                <div className="w-1/3"></div>
              </div>
              {/* EXPERIENCE LIST ITEM */}
              <div className="flex justify-between">
                {/* LEFT */}
                <div className="w-1/3"></div>
                {/* CENTER */}
                <div className="w-1/6 flex justify-center">
                  {/* LINE */}
                  <div className="w-1 h-full bg-gray-600 rounded relative">
                    {/* LINE CIRCLE */}
                    <div className="absolute w-5 h-5 rounded-full ring-4 ring-red-400 bg-white -left-2"></div>
                  </div>
                </div>
                {/* RIGHT */}
                <div className="w-1/3">
                  {/* JOB TITLE */}
                  <div className="bg-white p-3 font-semibold rounded-b-lg rounded-s-lg">
                    Hilo Design
                  </div>
                  {/* JOB DESCRIPTION */}
                  <div className="p-3 text-sm italic">
                    Developed secure Node.js backend communicating MySQL
                    Database and caching for fast performance, using JWT for
                    Shopify API integrations providing under 1s loads, served
                    1000s of partners
                  </div>
                  {/* JOB DATE */}
                  <div className="p-3 text-red-400 text-sm font-semibold">
                    2019 - 2021
                  </div>
                  {/* JOB COMPANY */}
                  <div className="p-1 rounded bg-white text-sm font-semibold w-fit">
                    Full Stack Intern
                  </div>
                </div>
              </div>
              {/* EXPERIENCE LIST ITEM */}
              <div className="flex justify-between">
                {/* LEFT */}
                <div className="w-1/3">
                  {/* JOB TITLE */}
                  <div className="bg-white p-3 font-semibold rounded-b-lg rounded-s-lg">
                    Kurukshetra University
                  </div>
                  {/* JOB DESCRIPTION */}
                  <div className="p-3 text-sm italic">
                    Bachelor of Technology in Computer Science GPA - 8.9/10
                  </div>
                  {/* JOB DATE */}
                  <div className="p-3 text-red-400 text-sm font-semibold">
                    2019-2023
                  </div>
                  {/* JOB COMPANY */}
                  <div className="p-1 rounded bg-white text-sm font-semibold w-fit">
                    Student
                  </div>
                </div>
                {/* CENTER */}
                <div className="w-1/6 flex justify-center">
                  {/* LINE */}
                  <div className="w-1 h-full bg-gray-600 rounded relative">
                    {/* LINE CIRCLE */}
                    <div className="absolute w-5 h-5 rounded-full ring-4 ring-red-400 bg-white -left-2"></div>
                  </div>
                </div>
                {/* RIGHT */}
                <div className="w-1/3"></div>
              </div>
            </motion.div>
          </div>
        </div>
        {/* BRAIN ANIMATION */}
        <div className="hidden lg:block lg:w-1/3 xl:w-1/2 sticky top-0 z-30">
          <Brain scrollYProgress={scrollYProgress} />
        </div>
      </div>
    </motion.div>
  );
};

export default AboutPage;
