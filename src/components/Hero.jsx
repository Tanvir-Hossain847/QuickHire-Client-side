"use client";
import Image from "next/image";

const Hero = () => {
  return (
    <section className="relative w-full max-w-11/12 mx-auto px-6 md:px-12 pt-32 overflow-visible">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* LEFT CONTENT */}
        <div className="z-50 mt-8 lg:mt-0 relative">
          <h1 className="text-6xl md:text-[72px] font-bold space-y-2 text-[#1e2532] leading-[1.1] mb-6 tracking-tight">
            Discover <br />
            more than <br />
            <span className="relative inline-block text-[#26A4FF]">
              <span className="relative z-10 block pb-2 translate-y-[-8px]">5000+ Jobs</span>
              {/* Blue Scribble Underline SVG */}
              <Image
                src="https://i.ibb.co.com/Pz0QcshV/Group.png"
                alt="underline"
                width={200}
                height={20}
                className="absolute w-[110%] h-auto object-contain bottom-[-15px]"
              />
            </span>
          </h1>

          <p className="text-[#848E9F] text-lg md:text-xl max-w-[480px] mb-10 leading-relaxed font-medium">
            Great platform for the job seeker that searching for new career
            heights and passionate about startups.
          </p>

          {/* SEARCH BAR COMPONENT */}
          <div className="bg-white p-3 md:p-4 rounded-lg shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)] flex flex-col md:flex-row items-end gap-6 mb-6 relative z-50 w-full md:min-w-[700px] lg:min-w-[850px]">
            {/* Job Input */}
            <div className="flex items-center gap-3 px-2 flex-1 w-full border-b border-gray-200 pb-2">
              <svg
                className="w-5 h-5 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <circle cx="11" cy="11" r="8" strokeWidth="2" />
                <path
                  d="M21 21l-4.35-4.35"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <input
                type="text"
                placeholder="Job title or keyword"
                className="w-full bg-transparent outline-none text-[#1e2532] placeholder:text-gray-400 font-medium"
              />
            </div>

            {/* Location Input */}
            <div className="flex items-center gap-3 px-2 flex-1 w-full group cursor-pointer relative border-b border-gray-200 pb-2">
              <svg
                className="w-5 h-5 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"
                  strokeWidth="2"
                />
                <circle cx="12" cy="10" r="3" strokeWidth="2" />
              </svg>
              <select className="w-full bg-transparent outline-none text-[#1e2532] font-semibold appearance-none cursor-pointer pr-8 relative z-10">
                <option>Florence, Italy</option>
                <option>New York, USA</option>
                <option>London, UK</option>
              </select>
              <svg
                className="w-4 h-4 text-gray-500 absolute right-2 z-0 pointer-events-none"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M19 9l-7 7-7-7"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* CTA Button */}
            <button className="bg-[#5645ee] text-white px-8 py-3.5 rounded-[4px] font-bold w-full md:w-auto hover:bg-[#4535c8] transition-all whitespace-nowrap">
              Search my job
            </button>
          </div>

          <div className="text-[15px] text-[#7a8290]">
            Popular :{" "}
            <span className="text-[#1e2532] font-semibold ml-1">
              UI Designer, UX Researcher, Android, Admin
            </span>
          </div>
        </div>

        {/* RIGHT IMAGE SECTION */}
        <div className="relative flex justify-end items-end h-[500px] md:h-[600px]">
          {/* BACKGROUND PATTERN PLACEHOLDER */}
          <div className="absolute inset-0 z-0">
            <Image
              src="https://i.ibb.co.com/TBs4ZD6s/Pattern.png"
              alt="background pattern"
              fill
              className="object-contain opacity-[0.8] scale-[1.3] -translate-y-12"
            />
          </div>

          {/* MAIN IMAGE (THE GUY) */}
          <div className="relative z-10 w-[95%] h-[100%]  translate-y-[-2rem]">
            <Image
              src="https://i.ibb.co.com/zWzNHwCY/849d976651c585cf41e864d6b53eba0a93aec63f.png"
              alt="Find your dream job"
              fill
              className="object-contain object-bottom"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
