import Image from "next/image";

const Puzzles = () => {
  return (
    <section className="text-gray-400 bg-gray-900 body-font">
      <div className="container py-5">
        <div className="flex flex-wrap -m-4">
          <div className="p-4 md:w-1/3">
            <div className="h-full border-2 border-gray-800 rounded-lg overflow-hidden">
              <Image
                className="lg:h-48 md:h-36 w-full object-cover object-center"
                src={"/images/puzzles/puzzle-3.webp"}
                height={500}
                width={500}
                alt="blog"
              />
              <div className="p-6">
                <h2 className="tracking-widest text-xs title-font font-medium text-gray-500 mb-1">
                  EASY
                </h2>
                <h1 className="title-font text-lg font-medium text-white mb-3">
                  BEST MOVE FOR BLACK
                </h1>
                <div className="cursor-pointer flex items-center flex-wrap ">
                  <a className="text-indigo-400 inline-flex items-center md:mb-2 lg:mb-0">
                    Learn More
                    <svg
                      className="w-4 h-4 ml-2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14" />
                      <path d="M12 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 md:w-1/3">
            <div className="h-full border-2 border-gray-800 rounded-lg overflow-hidden">
              <Image
                className="lg:h-48 md:h-36 w-full object-cover object-center"
                src={"/images/puzzles/puzzle-1.webp"}
                height={500}
                width={500}
                alt="blog"
              />
              <div className="p-6">
                <h2 className="tracking-widest text-xs title-font font-medium text-gray-500 mb-1">
                  MEDIUM
                </h2>
                <h1 className="title-font text-lg font-medium text-white mb-3">
                  MOVE WHITE TO WIN
                </h1>
                <div className="cursor-pointer flex items-center flex-wrap">
                  <a className="text-indigo-400 inline-flex items-center md:mb-2 lg:mb-0">
                    Learn More
                    <svg
                      className="w-4 h-4 ml-2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14" />
                      <path d="M12 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 md:w-1/3">
            <div className="h-full border-2 border-gray-800 rounded-lg overflow-hidden">
              <Image
                className="lg:h-48 md:h-36 w-full object-cover object-center"
                src={"/images/puzzles/puzzle-2.webp"}
                height={500}
                width={500}
                alt="blog"
              />
              <div className="p-6">
                <h2 className="tracking-widest text-xs title-font font-medium text-gray-500 mb-1">
                  HARD
                </h2>
                <p className="title-font text-lg font-medium text-white mb-3">
                  MOVE BLACK TO WIN
                </p>
                <div className="cursor-pointer flex items-center flex-wrap ">
                  <a className="text-indigo-400 inline-flex items-center md:mb-2 lg:mb-0">
                    Learn More
                    <svg
                      className="w-4 h-4 ml-2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14" />
                      <path d="M12 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Puzzles;
