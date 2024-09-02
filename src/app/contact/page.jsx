"use client";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

const ContactPage = () => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const text = "Say Hello or Ask me Something!";
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    setError(false);
    setSuccess(false);

    emailjs
      .sendForm(
        process.env.NEXT_PUBLIC_SERVICE_ID,
        process.env.NEXT_PUBLIC_TEMPLATE_ID,
        form.current,
        process.env.NEXT_PUBLIC_PUBLIC_KEY
      )
      .then(
        () => {
          setSuccess(true);
          form.current.reset();
        },
        () => {
          setError(true);
        }
      );
  };

  return (
    <motion.div
      className="h-full"
      initial={{ y: "-200vh" }}
      animate={{ y: "-12%" }}
      transition={{ duration: 1 }}>
      {/* Main Container */}
      <div className="flex flex-col lg:flex-row px-4 sm:px-8 md:px-12 lg:px-20 xl:px-48 lg:overflow-hidden min-h-screen">
        {/* Text Container */}
        <div className="flex items-center justify-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl lg:w-1/2 h-[30vh] lg:h-auto lg:min-h-screen p-4 mb-8 lg:mb-0">
          <div className="flex flex-wrap justify-center items-center">
            {text.split("").map((letter, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: index * 0.1,
                }}>
                {letter}
              </motion.span>
            ))}
            <span className="ml-2">😊</span>
          </div>
        </div>
        {/* Form Container */}
        <form
          onSubmit={sendEmail}
          ref={form}
          className="bg-red-50 rounded-xl lg:relative lg:top-[150px] text-base sm:text-lg md:text-xl lg:w-1/2 max-w-full max-h-[80vh] flex flex-col gap-4 sm:gap-6 md:gap-8 justify-center p-4 sm:p-6 md:p-8 lg:p-12 xl:p-16 overflow-auto">
          <span className="mt-4">Dear Tejasvi,</span>
          <textarea
            rows={8}
            className="bg-transparent border-b-2 border-b-black outline-none resize-none"
            name="user_message"
          />
          <span>My mail address is:</span>
          <input
            name="user_email"
            type="text"
            className="bg-transparent border-b-2 border-b-black outline-none"
          />
          <span>Regards</span>
          <button className="bg-purple-200 rounded font-semibold text-gray-600 p-2 sm:p-3 md:p-4">
            Send
          </button>
          {success && (
            <span className="text-green-600 font-semibold">
              Your message has been sent successfully!
            </span>
          )}
          {error && (
            <span className="text-red-600 font-semibold">
              Something went wrong!
            </span>
          )}
        </form>
      </div>
    </motion.div>
  );
};

export default ContactPage;
