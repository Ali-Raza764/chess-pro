import React from "react";
import Image from "next/image";
import Link from "next/link";

const hero = () => {
  return (
    <section className="h-full w-full text-gray-400 body-font flex items-center justify-center">
      <div className="p-5 md:px-14 flex flex-col-reverse md:flex-row items-center justify-between w-full">
        <div className="md:w-2/3 md:pr-16 lg:pr-0 pr-0 mt-6">
          <h1 className="title-font text-2xl md:text-3xl text-white font-bold">
            WELCOME TO <strong className="text-yellow-500">CHESSPRO</strong>
          </h1>
          <p className="leading-relaxed mt-4">
            Life is a chess match. Every decision that you make has a
            consequence to it.
          </p>
          <p className="leading-relaxed mt-4">
            When you see a good move, look for a better one.
          </p>
          <div className="mt-2">
            <Link href="/home">
              <button className="text-gray-900 font-semibold bg-yellow-500 border-0 py-2 px-6 focus:outline-none hover:bg-yellow-600 rounded text-lg">
                Play A Game
              </button>
            </Link>
          </div>
        </div>
        <div className="w-full md:w-1/3 flex items-center justify-center">
          <div className="bg-gray-800 bg-opacity-50 rounded-lg p-3 w-max hero-image">
            <Image
              src={"/chess-1.webp"}
              alt="chess"
              width={300}
              height={300}
              priority
              className="rounded-md w-full max-w-[20rem] sm:max-w-screen"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default hero;
