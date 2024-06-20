"use client";
import Link from "next/link";
import React, { useState } from "react";
import { links } from "./links";
import { usePathname } from "next/navigation";
import { TiThMenu } from "react-icons/ti";
import { IoMdCloseCircle } from "react-icons/io";
import { FaChessKnight } from "react-icons/fa6";

const MobileNavbar = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const toggleMenu = () => {
    if (open) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };
  return (
    <div className="md:hidden">
      <button onClick={toggleMenu}>
        <TiThMenu size={30} />
      </button>

      <div
        className={`fixed z-50 ${
          open ? "backdrop-blur-sm block" : "hidden"
        } h-screen w-72 top-0 right-0 left-0 bottom-0 trasition-all duration-500`}
      >
        <div
          className={`menu fixed top-0 ${
            open ? "left-0" : "-left-[1000px]"
          } bg-gray-900 h-screen w-72 transition duration-500 z-50 p-3`}
        >
          <div className="w-full flex items-center justify-between">
            <h2 className="font-semibold flex text-xl text-white">
              <span>CHESS</span>
              <FaChessKnight size={30} className="text-white" />
              <span>PRO</span>
            </h2>
            <button onClick={toggleMenu}>
              <IoMdCloseCircle size={30} />
            </button>
          </div>
          <div className="navigation flex flex-col items-center justify-center my-4 gap-4 overflow-y-auto">
            {links.map((link) => (
              <Link
                onClick={() => {
                  setOpen(!open);
                }}
                key={link.name}
                href={link.href}
                className={`text-gray-200 transition text-lg w-full flex items-center gap-x-4 font-medium`}
              >
                <link.icon size={30} className="text-gray-400" />
                <h3
                  className={`hover:border-yellow-500 border-b ${
                    pathname === link.href
                      ? "border-yellow-600"
                      : "border-transparent"
                  }`}
                >
                  {link.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileNavbar;
