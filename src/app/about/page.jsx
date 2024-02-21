"use client";
import Brain from "@/components/Brain";
import { motion, useInView, useScroll } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

const AboutPage = () => {
  const containerRef = useRef();

  const { scrollYProgress } = useScroll({ container: containerRef });

  const skillRef = useRef();
  // const isSkillRefInView = useInView(skillRef, {once:true});
  const isSkillRefInView = useInView(skillRef, { margin: "-100px" });

  const experienceRef = useRef();
  const isExperienceRefInView = useInView(experienceRef, { margin: "-100px" });

  return (
    <motion.div
      className="h-full"
      initial={{ y: "-200vh" }}
      animate={{ y: "0%" }}
      transition={{ duration: 1 }}>
      {/* CONTAINER */}
      <div className="h-full overflow-scroll lg:flex" ref={containerRef}>
        {/* TEXT CONTAINER */}
        <div className="p-4 sm:p-8 md:p-12 lg:p-20 xl:p-48 flex flex-col gap-24 md:gap-32 lg:gap-48 xl:gap-64 lg:w-2/3 lg:pr-0 xl:w-1/2">
          {/* BIOGRAPHY CONTAINER */}
          <div className="flex flex-col gap-12 justify-center">
            {/* BIOGRAPHY IMAGE */}
            <Image
              src="/bio.jpg"
              alt=""
              width={112}
              height={112}
              className="w-28 h-28 rounded-full object-cover"
            />
            {/* BIOGRAPHY TITLE */}
            <h1 className="font-bold text-2xl">BIOGRAPHY</h1>
            {/* BIOGRAPHY DESC */}
            <p className="text-lg">
              Ongoing Master&rsquo;s studies @Concordia complemented by Bachelor
              of Technology in Computer Science. Proficient in Python,
              JavaScript, and Java, with expertise in React.js, Next.js, Node.js
              and Django for web development. Skilled in AI and Machine learning
              with practical experience in Pytorch, TensorFlow, and Keras.
              Strong communicator and quick learner, poised to make meaningful
              contributions to any team. Passionate about driving innovation in
              the tech industry.
            </p>
            {/* BIOGRAPHY QUOTE */}
            <span className="italic"></span>
            {/* BIOGRAPHY SIGN SVG*/}
            <div className="self-end">
              <svg
                width="202"
                height="213"
                viewBox="0 0 202 213"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M31.5139 77.4168C31.5139 80.7935 32.1952 84.084 32.4527 87.4436C32.8682 92.8656 32.57 98.3595 32.57 103.791C32.57 109.541 32.57 115.29 32.57 121.04"
                  stroke="white"
                  stroke-width="5"
                  stroke-linecap="round"
                />
                <path
                  d="M46.2988 102.222C55.8155 98.7534 66.3234 96.6018 73.7564 90.247C77.7138 86.8636 72.7832 82.6852 68.0654 82.5487C63.9727 82.4303 60.8518 87.4279 58.9715 89.6292C55.8524 93.281 53.2943 97.3649 50.9337 101.367C48.6637 105.215 48.2404 110.699 49.0563 114.862C49.3575 116.399 51.4536 117.721 53.2805 117.951C56.5304 118.361 60.5069 116.095 62.9611 114.625C66.4647 112.526 69.447 109.799 71.879 106.879C78.066 99.4517 84.3171 89.6149 84.3171 80.4103C84.3171 78.4639 84.3171 80.1622 84.3171 81.2657C84.3171 86.8825 84.5054 92.5235 84.1997 98.1353C83.1794 116.867 77.1747 135.846 70.3535 153.639C63.9869 170.245 57.4668 187.058 49.2909 203.155C48.6309 204.454 46.0557 210.133 43.5413 209.998C41.1495 209.868 39.3097 206.471 38.613 205.151C34.0104 196.429 33.38 185.934 33.1566 176.591C32.7546 159.776 38.6439 134.604 61.6704 128.501C67.3085 127.006 73.5181 127.392 79.3301 127.788C82.4982 128.004 86.8361 129.046 89.8321 127.788C95.6441 125.347 96.5314 118.232 97.1658 113.627C98.7988 101.774 96.9898 89.4786 96.9898 77.5591C96.9898 75.183 96.1127 71.1781 99.8647 70.146C102.778 69.3446 105.652 70.9418 107.433 72.7121C108.243 73.517 110.132 76.0129 109.956 77.2265C109.872 77.8033 103.706 77.3371 103.092 77.2265C101.05 76.8591 96.4293 75.501 94.995 77.5116C92.953 80.3742 95.9349 85.1772 97.1072 87.871C98.6406 91.3947 99.5328 95.2878 101.331 98.7056C102.014 100.002 103.182 102.283 105.145 102.222C107.795 102.139 111.137 99.5738 112.713 97.9452C114.196 96.4133 114.415 94.6877 114.415 92.8131C114.415 88.6084 112.016 85.3162 109.78 81.6934C108.118 79.001 114.595 86.9552 118.228 87.5859C126.002 88.9351 125.751 77.7601 125.386 74.1852C124.753 67.98 121.165 61.9876 117.172 56.7928C115.417 54.5082 113.694 51.7557 109.78 51.7557C107.305 51.7557 106.298 53.4938 106.084 55.1772C105.619 58.834 109.62 60.5727 113.652 61.0697C119.447 61.7839 124.314 61.7109 130.139 61.2597C134.225 60.9431 138.187 59.8616 142.342 60.4044C145.355 60.798 144.863 64.6735 144.043 66.2969C142.229 69.889 136.84 72.413 132.661 73.805C127.26 75.6043 121.185 75.1744 116.703 72.0943C114.935 70.8795 109.726 67.0753 111.892 64.7762C114.616 61.8852 120.72 63.392 124.037 64.3961C129.699 66.1101 133.432 68.9782 137.003 72.8546C137.382 73.2659 139.935 76.1108 140.816 75.5158C142.848 74.1448 143.248 71.509 143.574 69.5282C144.409 64.4558 143.457 59.5637 143.457 54.5119C143.457 53.0162 142.929 51.6209 142.929 50.14C142.929 48.0774 145.885 50.441 146.86 50.9954C156.778 56.6381 159.41 66.5518 163.639 75.1831C163.734 75.3757 165.58 79.409 165.634 79.3649C165.934 79.1217 165.911 76.3947 165.927 76.2523C166.652 70.0438 167.376 63.843 168.274 57.6482C169.726 47.6308 172.092 37.8986 174.2 27.9957C174.464 26.757 174.611 25.642 174.611 24.3841"
                  stroke="white"
                  stroke-width="5"
                  stroke-linecap="round"
                />
                <path
                  d="M3 100.084C15.3729 90.5179 28.7897 81.8039 41.253 72.2845C49.3121 66.129 57.5964 60.1793 65.7772 54.1317C73.1737 48.6639 80.1521 42.8119 87.7199 37.4996C93.2688 33.6045 98.8306 29.6647 104.529 25.9284C105.641 25.1992 107.098 24.2002 107.55 23.101"
                  stroke="white"
                  stroke-width="5"
                  stroke-linecap="round"
                />
                <path
                  d="M82.7331 67.1524C82.7331 69.7069 82.548 72.3021 82.7331 74.8508C82.7881 75.6079 84.5735 76.1086 85.2559 75.6111C86.3442 74.8178 86.4293 74.3157 86.4293 73.14"
                  stroke="white"
                  stroke-width="5"
                  stroke-linecap="round"
                />
                <path
                  d="M178.835 76.5613C179.528 65.8974 183.52 55.0726 186.169 44.6514C188.084 37.1155 190.065 29.5359 191.39 21.913C191.652 20.4066 191.072 14.9563 193.092 14.5473"
                  stroke="white"
                  stroke-width="5"
                  stroke-linecap="round"
                />
                <path
                  d="M194.148 3C193.103 3.10574 192.036 6.44893 192.036 7.27686C192.036 8.45258 191.787 10.6984 193.884 10.6984C194.572 10.6984 198.732 9.14251 198.871 8.75C199.152 7.95275 199.043 4.83218 197.844 4.71074C195.91 4.5149 195.935 3.11471 194.265 4.80579C192.451 6.64268 196.586 6.42149 197.58 6.42149C199.764 6.42149 196.482 6.91179 195.468 7.27686C194.181 7.74007 190.524 8.98761 193.62 8.98761"
                  stroke="white"
                  stroke-width="5"
                  stroke-linecap="round"
                />
                <path
                  d="M108.606 81.6939C108.87 83.6175 111.249 84.9037 109.134 82.7631C108.435 82.0553 107.16 80.4513 107.022 79.5555C106.889 78.6913 105.45 79.461 104.91 78.9139C104.569 78.5689 103.447 77.5366 103.033 77.4408C102.046 77.2124 96.897 76.8064 100.422 77.4408C102.036 77.7314 104.158 78.709 105.321 79.6505C105.936 80.1492 108.915 81.6939 109.398 81.6939C112.997 81.6939 113.887 86.9886 113.887 88.9646"
                  stroke="white"
                  stroke-width="5"
                  stroke-linecap="round"
                />
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
              height={50}>
              <path
                d="M5 15C5 16.8565 5.73754 18.6371 7.05029 19.9498C8.36305 21.2626 10.1435 21.9999 12 21.9999C13.8565 21.9999 15.637 21.2626 16.9498 19.9498C18.2625 18.6371 19 16.8565 19 15V9C19 7.14348 18.2625 5.36305 16.9498 4.05029C15.637 2.73754 13.8565 2 12 2C10.1435 2 8.36305 2.73754 7.05029 4.05029C5.73754 5.36305 5 7.14348 5 9V15Z"
                stroke="#000000"
                strokeWidth="1"></path>
              <path d="M12 6V14" stroke="#000000" strokeWidth="1"></path>
              <path
                d="M15 11L12 14L9 11"
                stroke="#000000"
                strokeWidth="1"></path>
            </motion.svg>
          </div>
          {/* SKILLS CONTAINER */}
          <div className="flex flex-col gap-12 justify-center" ref={skillRef}>
            {/* SKILL TITLE */}
            <motion.h1
              initial={{ x: "-300px" }}
              animate={isSkillRefInView ? { x: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="font-bold text-2xl">
              SKILLS
            </motion.h1>
            {/* SKILL LIST */}
            <motion.div
              initial={{ x: "-300px" }}
              animate={isSkillRefInView ? { x: 0 } : {}}
              className="flex gap-4 flex-wrap">
              <div className="rounded  p-2 text-sm cursor-pointer bg-black text-white hover:bg-white hover:text-black">
                JavaScript
              </div>
              <div className="rounded  p-2 text-sm cursor-pointer bg-black text-white hover:bg-white hover:text-black">
                TypeScript
              </div>
              <div className="rounded  p-2 text-sm cursor-pointer bg-black text-white hover:bg-white hover:text-black">
                React.js
              </div>
              <div className="rounded  p-2 text-sm cursor-pointer bg-black text-white hover:bg-white hover:text-black">
                Next.js
              </div>
              <div className="rounded  p-2 text-sm cursor-pointer bg-black text-white hover:bg-white hover:text-black">
                Tailwind CSS
              </div>
              <div className="rounded  p-2 text-sm cursor-pointer bg-black text-white hover:bg-white hover:text-black">
                MongoDB
              </div>
              <div className="rounded  p-2 text-sm cursor-pointer bg-black text-white hover:bg-white hover:text-black">
                MySQL
              </div>
              <div className="rounded  p-2 text-sm cursor-pointer bg-black text-white hover:bg-white hover:text-black">
                Node.js
              </div>
              <div className="rounded  p-2 text-sm cursor-pointer bg-black text-white hover:bg-white hover:text-black">
                Express.js
              </div>
              <div className="rounded  p-2 text-sm cursor-pointer bg-black text-white hover:bg-white hover:text-black">
                Django
              </div>
              <div className="rounded  p-2 text-sm cursor-pointer bg-black text-white hover:bg-white hover:text-black">
                Flask
              </div>
              <div className="rounded  p-2 text-sm cursor-pointer bg-black text-white hover:bg-white hover:text-black">
                Pytorch
              </div>
              <div className="rounded  p-2 text-sm cursor-pointer bg-black text-white hover:bg-white hover:text-black">
                Tensorflow
              </div>
              <div className="rounded  p-2 text-sm cursor-pointer bg-black text-white hover:bg-white hover:text-black">
                Keras
              </div>
              <div className="rounded  p-2 text-sm cursor-pointer bg-black text-white hover:bg-white hover:text-black">
                OpenCV
              </div>
              <div className="rounded  p-2 text-sm cursor-pointer bg-black text-white hover:bg-white hover:text-black">
                Numpy
              </div>
              <div className="rounded  p-2 text-sm cursor-pointer bg-black text-white hover:bg-white hover:text-black">
                Pandas
              </div>
              <div className="rounded  p-2 text-sm cursor-pointer bg-black text-white hover:bg-white hover:text-black">
                Algorithms
              </div>
              <div className="rounded  p-2 text-sm cursor-pointer bg-black text-white hover:bg-white hover:text-black">
                Linux
              </div>
              <div className="rounded  p-2 text-sm cursor-pointer bg-black text-white hover:bg-white hover:text-black">
                GraphQL
              </div>
              <div className="rounded  p-2 text-sm cursor-pointer bg-black text-white hover:bg-white hover:text-black">
                Redux
              </div>
              <div className="rounded  p-2 text-sm cursor-pointer bg-black text-white hover:bg-white hover:text-black">
                Webpack
              </div>
              <div className="rounded  p-2 text-sm cursor-pointer bg-black text-white hover:bg-white hover:text-black">
                Vite
              </div>
              <div className="rounded  p-2 text-sm cursor-pointer bg-black text-white hover:bg-white hover:text-black">
                Docker
              </div>
              <div className="rounded  p-2 text-sm cursor-pointer bg-black text-white hover:bg-white hover:text-black">
                AWS
              </div>
              <div className="rounded  p-2 text-sm cursor-pointer bg-black text-white hover:bg-white hover:text-black">
                Firebase
              </div>
              <div className="rounded  p-2 text-sm cursor-pointer bg-black text-white hover:bg-white hover:text-black">
                Git
              </div>
              <div className="rounded  p-2 text-sm cursor-pointer bg-black text-white hover:bg-white hover:text-black">
                Figma
              </div>
            </motion.div>
            {/* SKILL SCROLL SVG */}
            <motion.svg
              initial={{ opacity: 0.2, y: 0 }}
              animate={{ opacity: 1, y: "10px" }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              width={50}
              height={50}>
              <path
                d="M5 15C5 16.8565 5.73754 18.6371 7.05029 19.9498C8.36305 21.2626 10.1435 21.9999 12 21.9999C13.8565 21.9999 15.637 21.2626 16.9498 19.9498C18.2625 18.6371 19 16.8565 19 15V9C19 7.14348 18.2625 5.36305 16.9498 4.05029C15.637 2.73754 13.8565 2 12 2C10.1435 2 8.36305 2.73754 7.05029 4.05029C5.73754 5.36305 5 7.14348 5 9V15Z"
                stroke="#000000"
                strokeWidth="1"></path>
              <path d="M12 6V14" stroke="#000000" strokeWidth="1"></path>
              <path
                d="M15 11L12 14L9 11"
                stroke="#000000"
                strokeWidth="1"></path>
            </motion.svg>
          </div>
          {/* EXPERIENCE CONTAINER */}
          <div
            className="flex flex-col gap-12 justify-center pb-48"
            ref={experienceRef}>
            {/* EXPERIENCE TITLE */}
            <motion.h1
              initial={{ x: "-300px" }}
              animate={isExperienceRefInView ? { x: "0" } : {}}
              transition={{ delay: 0.2 }}
              className="font-bold text-2xl">
              EXPERIENCE & EDUCATION
            </motion.h1>
            {/* EXPERIENCE LIST */}
            <motion.div
              initial={{ x: "-300px" }}
              animate={isExperienceRefInView ? { x: "0" } : {}}
              className="">
              {/* EXPERIENCE LIST ITEM */}
              <div className="flex justify-between h-48">
                {/* LEFT */}
                <div className="w-1/3 ">
                  {/* JOB TITLE */}
                  <div className="bg-white p-3 font-semibold rounded-b-lg rounded-s-lg">
                    Master&rsquo;s of Applied Computer Science
                  </div>
                  {/* JOB DESC */}
                  <div className="p-3 text-sm italic">
                    I am here to refine my knowledge for the industry, to
                    connect and to build something Interesting{" "}
                  </div>
                  {/* JOB DATE */}
                  <div className="p-3 text-red-400 text-sm font-semibold">
                    2024 - Present
                  </div>
                  {/* JOB COMPANY */}
                  <div className="p-1 rounded bg-white text-sm font-semibold w-fit">
                    Concordia University
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
                <div className="w-1/3 "></div>
              </div>
              {/* EXPERIENCE LIST ITEM */}
              <div className="flex justify-between h-48">
                {/* LEFT */}
                <div className="w-1/3 "></div>
                {/* CENTER */}
                <div className="w-1/6 flex justify-center">
                  {/* LINE */}
                  <div className="w-1 h-full bg-gray-600 rounded relative">
                    {/* LINE CIRCLE */}
                    <div className="absolute w-5 h-5 rounded-full ring-4 ring-red-400 bg-white -left-2"></div>
                  </div>
                </div>
                {/* RIGHT */}
                <div className="w-1/3 ">
                  {/* JOB TITLE */}
                  <div className="bg-white p-3 font-semibold rounded-b-lg rounded-s-lg">
                    Full Stack Developer{" "}
                  </div>
                  {/* JOB DESC */}
                  <div className="p-3 text-sm italic">
                    I spearheaded React-based application development,
                    leveraging advanced skills.{" "}
                  </div>
                  {/* JOB DATE */}
                  <div className="p-3 text-red-400 text-sm font-semibold">
                    Nov 2022 - Dec 2022{" "}
                  </div>
                  {/* JOB COMPANY */}
                  <div className="p-1 rounded bg-white text-sm font-semibold w-fit">
                    Hilo Design
                  </div>
                </div>
              </div>
              {/* EXPERIENCE LIST ITEM */}
              <div className="flex justify-between h-48">
                {/* LEFT */}
                <div className="w-1/3 ">
                  {/* JOB TITLE */}
                  <div className="bg-white p-3 font-semibold rounded-b-lg rounded-s-lg">
                    Bachelor of Technology, Computer Science{" "}
                  </div>
                  {/* JOB DESC */}
                  <div className="p-3 text-sm italic">
                    Got my Passion for Engineering Computer Science Solutions
                    from here{" "}
                  </div>
                  {/* JOB DATE */}
                  <div className="p-3 text-red-400 text-sm font-semibold">
                    2019 - 2023{" "}
                  </div>
                  <div className="p-1 rounded bg-white text-sm font-semibold w-fit">
                    Kurukshetra University
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
                <div className="w-1/3 "></div>
              </div>
            </motion.div>
          </div>
        </div>
        {/* SVG CONTAINER */}
        <div className="hidden lg:block w-1/3 sticky top-0 z-30 xl:w-1/2">
          <Brain scrollYProgress={scrollYProgress} />
        </div>
      </div>
    </motion.div>
  );
};

export default AboutPage;
