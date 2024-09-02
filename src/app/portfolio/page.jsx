"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

const items = [
  {
    id: 1,
    color: "from-red-300 to-blue-300",
    title: "Skin Disease Classifier",
    desc: "Developed a fast Mobile App using React Native to click picture of the affected area and find the diseases out of 23 classes including images of different body parts with great accuracy.",
    img: "https://images.pexels.com/photos/7479968/pexels-photo-7479968.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    link: "https://github.com/tejasvi541/Skin-Disease-Classifier-App",
  },
  {
    id: 2,
    color: "from-blue-300 to-violet-300",
    title: "Learning Management App",
    desc: "This project aims to provide a robust, scalable, and customizable solution for managing courses, facilitating learning, and empowering both students and teachers. Built with a modern tech stack like NEXT.js, TailwindCSS, and Postgres.",
    img: "https://images.pexels.com/photos/4974914/pexels-photo-4974914.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    link: "https://github.com/tejasvi541/Course-Management-System",
  },
  {
    id: 3,
    color: "from-violet-300 to-purple-300",
    title: "Go-Server",
    desc: "he Go-Server project is a simple web application built with Go, utilizing the Gin framework for routing, and PostgreSQL as the database. This project demonstrates the core principles of building and deploying a RESTful API with JWT authentication, focusing on managing events and user registration.",
    img: "https://images.pexels.com/photos/249798/pexels-photo-249798.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    link: "https://github.com/tejasvi541/Not-Simple-ChatApp",
  },
  {
    id: 4,
    color: "from-purple-300 to-red-300",
    title: "Not a Simple-ChatApp",
    desc: "A fully scalable chat app with minimal ui built using React, Node.js, and Socket.io, redis for caching, postgres for database and Kafka for real-time messaging. The app is able to handle 1000+ users at a time.",
    img: "https://images.pexels.com/photos/3888149/pexels-photo-3888149.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    link: "https://github.com/tejasvi541/Go-Server",
  },
  {
    id: 5,
    color: "from-red-300 to-blue-300",
    title: "Face-Recognition",
    desc: "Face recognition using Siamese Network with Triplet Loss. The model is trained on 5000 images of 500 people and tested on 1000 images of 100 people. The model is able to recognize the person with 98% accuracy.",
    img: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
    link: "https://github.com/tejasvi541/Face-Recognition-Siamese",
  },
];

const PortfolioPage = () => {
  const ref = useRef();

  const { scrollYProgress } = useScroll({ target: ref });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-65%"]);

  return (
    <motion.div
      className="h-full"
      initial={{ y: "-110vh" }}
      animate={{ y: "0%" }}
      transition={{ duration: 1 }}>
      <div className="h-[600vh] relative" ref={ref}>
        <div className="w-screen h-[calc(100vh-6rem)] flex items-center justify-center text-8xl text-center">
          My Works
        </div>
        <div className="sticky top-0 flex h-screen gap-4 items-center overflow-hidden">
          <motion.div style={{ x }} className="flex">
            <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-r from-purple-300 to-red-300" />
            {items.map((item) => (
              <div
                className={`h-screen w-screen flex items-center justify-center bg-gradient-to-r ${item.color}`}
                key={item.id}>
                <div className="flex flex-col gap-8 text-white">
                  <h1 className="text-xl font-bold md:text-4xl lg:text-6xl xl:text-8xl">
                    {item.title}
                  </h1>
                  <div className="relative w-80 h-56 md:w-96 md:h-64 lg:w-[500px] lg:h-[350px] xl:w-[600px] xl:h-[420px]">
                    <Image src={item.img} alt="" fill />
                  </div>
                  <p className="w-80 md:w96 lg:w-[500px] lg:text-lg xl:w-[600px]">
                    {item.desc}
                  </p>
                  <Link href={item.link} className="flex justify-end">
                    <button className="p-2 text-sm md:p-4 md:text-md lg:p-8 lg:text-lg bg-white text-gray-600 font-semibold m-4 rounded">
                      See Demo
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
      <div className="w-screen h-screen flex flex-col gap-16 items-center justify-center text-center">
        <h1 className="text-8xl">Do you have a job/project?</h1>
        <div className="relative">
          <motion.svg
            animate={{ rotate: 360 }}
            transition={{ duration: 8, ease: "linear", repeat: Infinity }}
            viewBox="0 0 300 300"
            className="w-64 h-64 md:w-[500px] md:h-[500px] ">
            <defs>
              <path
                id="circlePath"
                d="M 150, 150 m -60, 0 a 60,60 0 0,1 120,0 a 60,60 0 0,1 -120,0 "
              />
            </defs>
            <text fill="#000">
              <textPath xlinkHref="#circlePath" className="text-xl">
                Full-Stack/Machine Learning Developer
              </textPath>
            </text>
          </motion.svg>
          <Link
            href="/contact"
            className="w-16 h-16 md:w-28 md:h-28 absolute top-0 left-0 right-0 bottom-0 m-auto bg-black text-white rounded-full flex items-center justify-center">
            Hire Me
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default PortfolioPage;
