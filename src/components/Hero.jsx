import Image from "next/image";
import { Search, MapPin, ChevronDown } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative w-full max-w-11/12 mx-auto px-6 md:px-12 pt-32 overflow-visible">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* LEFT CONTENT */}
        <div className="z-50 mt-8 lg:mt-0 relative">
          <h1 className="text-5xl md:text-[72px] font-bold text-[#1e2532] leading-tight mb-6 tracking-tight">
            Discover <br className="hidden md:block" />
            more than <br className="hidden md:block" />
            <span className="relative inline-block text-[#26A4FF]">
              <span className="relative z-10 block pb-2">5000+ Jobs</span>
              {/* Blue Scribble Underline SVG */}
              <div className="absolute left-0 bottom-0 w-[110%] h-4 md:h-6 -translate-y-1">
                <Image
                  src="https://i.ibb.co.com/Pz0QcshV/Group.png"
                  alt="underline"
                  fill
                  className="object-contain"
                />
              </div>
            </span>
          </h1>

          <p className="text-[#848E9F] text-lg md:text-xl max-w-[480px] mb-10 leading-relaxed font-medium">
            Great platform for the job seeker that searching for new career
            heights and passionate about startups.
          </p>

          {/* SEARCH BAR COMPONENT */}
          <div className="bg-white p-2 md:p-3 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.06)] flex flex-col md:flex-row items-center gap-4 mb-8 w-full lg:w-[110%] relative z-50">
            {/* Job Input */}
            <div className="flex items-center gap-3 px-4 py-3 flex-1 w-full border-b md:border-b-0 md:border-r border-gray-100">
              <Search className="w-6 h-6 text-[#1e2532]" strokeWidth={2.5} />
              <input
                type="text"
                placeholder="Job title or keyword"
                className="w-full bg-transparent outline-none text-[#1e2532] placeholder:text-gray-400 font-medium text-lg"
              />
            </div>

            {/* Location Input */}
            <div className="flex items-center gap-3 px-4 py-3 flex-1 w-full relative">
              <MapPin className="w-6 h-6 text-[#1e2532]" strokeWidth={2.5} />
              <div className="relative flex-1">
                <select className="w-full bg-transparent outline-none text-[#1e2532] font-semibold text-lg appearance-none cursor-pointer pr-10">
                  <option>Florence, Italy</option>
                  <option>New York, USA</option>
                  <option>London, UK</option>
                </select>
                <ChevronDown className="w-5 h-5 text-gray-400 absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* CTA Button */}
            <button className="bg-[#5645ee] text-white px-10 py-4 rounded-lg font-bold w-full md:w-auto hover:bg-[#4535c8] transition-all whitespace-nowrap text-lg">
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
        <div className="hidden lg:flex relative justify-end items-end h-[500px] md:h-[600px]">
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
