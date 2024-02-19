import Link from "next/link";
const Navbar = () => {
  return (
    <div className="h-full flex justify-between items-center px-4 sm:px-8 md:px-12 lg:20 xl:48">
      {/* LOGO */}
      <div className="">
        <Link
          href="/"
          className="text-sm bg-black rounded-md p-1.5 font-semibold flex justify-center items-center">
          <span className="text-white mr-1">tejasvi</span>
          <span className="w-18 h-8 rounded bg-white text-black p-0.5 flex items-center justify-center">
            .co
          </span>
        </Link>
      </div>
      <div></div>
    </div>
  );
};

export default Navbar;
