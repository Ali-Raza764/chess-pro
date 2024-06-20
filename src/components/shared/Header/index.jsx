import Link from "next/link";
import { FaChessKnight } from "react-icons/fa6";
import { IoExtensionPuzzle } from "react-icons/io5";
import { FaUserAlt } from "react-icons/fa";
import MobileNavbar from "./MobileNavbar";
import SimpleNabar from "./SimpleNabar";

const Header = () => {
  return (
    <div className="h-16 sticky top-0 bg-gray-900 z-10 w-full p-2 text-white shadow-sm shadow-gray-500 justify-between items-center flex">

      <MobileNavbar />


      <div className="flex text-xl items-center">
        <h2 className="font-semibold flex text-xl text-white">
          <span>CHESS</span>
          <FaChessKnight size={30} className="text-white" />
          <span>PRO</span>
        </h2>
      </div>

      <SimpleNabar />

      <div className="flex gap-2 items-center">
        <Link
          href="/Puzzles"
          className="hidden md:block p-2 rounded-full hover:bg-white hover:text-slate-800 transition hover:scale-110"
        >
          <IoExtensionPuzzle size={25} />
        </Link>
        <Link
          href={"/profile"}
          className="p-2 rounded-full hover:bg-white hover:text-slate-800 transition hover:scale-110"
        >
          <FaUserAlt size={25} />{" "}
        </Link>
      </div>

    </div>
  );
};

export default Header;
