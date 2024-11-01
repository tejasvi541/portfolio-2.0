"use client";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

const ContactPage = () => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const text = "Say‎Hello\nor\nAsk‎me‎Something!";
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
    console.log(error);
  };

  return (
    <div className="h-[90vh] w-full  p-4 md:py-12 md:px-8 lg:px-20 xl:px-48">
      <motion.div
        className="h-full w-full max-w-7xl mx-auto"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}>
        {/* Main Container */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          {/* Text Container */}
          <div className="flex items-center justify-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl lg:w-1/2">
            <div className="flex flex-col text-center lg:text-left">
              {text.split("\n").map((line, lineIndex) => (
                <div
                  key={lineIndex}
                  className="flex flex-wrap justify-center lg:justify-start">
                  {line.split("").map((letter, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 1 }}
                      animate={{ opacity: 0 }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: index * 0.1,
                      }}
                      className="mx-0.5">
                      {letter}
                    </motion.span>
                  ))}
                </div>
              ))}
              <span className="mt-4 text-center lg:text-left">😊</span>
            </div>
          </div>

          {/* Form Container */}
          <div className="lg:w-1/2 max-w-md mx-auto lg:mx-0">
            <form
              onSubmit={sendEmail}
              ref={form}
              className="bg-red-50 rounded-xl text-sm sm:text-base md:text-lg w-full flex flex-col gap-6 justify-center p-6 md:p-8 lg:p-10 shadow-lg">
              <span className="text-gray-700 font-medium">Dear Tejasvi,</span>
              <textarea
                rows={6}
                className="bg-transparent border-b-2 border-b-black outline-none resize-none p-2 focus:border-purple-500 transition-colors"
                name="user_message"
                placeholder="Write your message here..."
              />
              <span className="text-gray-700 font-medium mt-4">
                My email address is:
              </span>
              <input
                name="user_email"
                type="email"
                className="bg-transparent border-b-2 border-b-black outline-none p-2 focus:border-purple-500 transition-colors"
                required
                placeholder="your@email.com"
              />
              <span className="text-gray-700 font-medium">Regards</span>
              <button className="bg-purple-200 rounded-lg font-semibold text-gray-700 py-3 px-6 hover:bg-purple-300 transition-all duration-300 transform hover:scale-105 active:scale-95 mt-4">
                Send
              </button>
              {success && (
                <span className="text-green-600 font-semibold text-center bg-green-50 p-3 rounded-lg">
                  Your message has been sent successfully!
                </span>
              )}
              {error && (
                <span className="text-red-600 font-semibold text-center bg-red-50 p-3 rounded-lg">
                  Something went wrong!
                </span>
              )}
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ContactPage;
