import Image from 'next/image';

const Hero = () => {
  return (
    <section className="relative w-full max-w-7xl mx-auto px-6 md:px-12 pt-12 pb-24 overflow-hidden">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        
        {/* LEFT CONTENT */}
        <div className="z-10">
          <h1 className="text-6xl md:text-[72px] font-extrabold text-[#1e2532] leading-[1.1] mb-6">
            Discover <br />
            more than <br />
            <span className="relative inline-block text-[#0084ff]">
              5000+ Jobs
              {/* Blue Scribble Underline SVG */}
              <svg className="absolute -bottom-4 left-0 w-full h-4" viewBox="0 0 300 20" fill="none">
                <path d="M5 15C50 5 150 5 295 15" stroke="#0084ff" strokeWidth="6" strokeLinecap="round" opacity="0.6"/>
                <path d="M15 12C80 8 180 8 285 12" stroke="#0084ff" strokeWidth="3" strokeLinecap="round"/>
              </svg>
            </span>
          </h1>

          <p className="text-[#7a8290] text-lg md:text-xl max-w-[480px] mb-10 leading-relaxed">
            Great platform for the job seeker that searching for new career heights and passionate about startups.
          </p>

          {/* SEARCH BAR COMPONENT */}
          <div className="bg-white p-2 rounded-lg shadow-[0_15px_50px_-15px_rgba(0,0,0,0.1)] border border-gray-100 flex flex-col md:flex-row items-center gap-2 mb-6">
            
            {/* Job Input */}
            <div className="flex items-center gap-3 px-4 flex-1 w-full">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8" strokeWidth="2.5" />
                <path d="M21 21l-4.35-4.35" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
              <input 
                type="text" 
                placeholder="Job title or keyword" 
                className="w-full py-3 outline-none text-[#1e2532] placeholder:text-gray-300 font-medium"
              />
            </div>

            <div className="hidden md:block w-[1px] h-8 bg-gray-200"></div>

            {/* Location Input */}
            <div className="flex items-center gap-3 px-4 flex-1 w-full group cursor-pointer">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" strokeWidth="2.5" />
                <circle cx="12" cy="10" r="3" strokeWidth="2.5" />
              </svg>
              <select className="w-full py-3 bg-transparent outline-none text-[#1e2532] font-semibold appearance-none cursor-pointer">
                <option>Florence, Italy</option>
                <option>New York, USA</option>
                <option>London, UK</option>
              </select>
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M19 9l-7 7-7-7" strokeWidth="3" strokeLinecap="round" strokeJoin="round" />
              </svg>
            </div>

            {/* CTA Button */}
            <button className="bg-[#5645ee] text-white px-8 py-4 rounded-[4px] font-bold w-full md:w-auto hover:bg-[#4535c8] transition-all whitespace-nowrap">
              Search my job
            </button>
          </div>

          <div className="text-[15px] text-[#7a8290]">
            Popular : <span className="text-[#1e2532] font-semibold ml-1">UI Designer, UX Researcher, Android, Admin</span>
          </div>
        </div>

        {/* RIGHT IMAGE SECTION */}
        <div className="relative flex justify-end items-center">
          {/* BACKGROUND PATTERN PLACEHOLDER */}
          <div className="absolute inset-0 z-0">
            <Image 
              src="/hero-bg-pattern.png" // Placeholder for the geometric lines
              alt="background pattern"
              fill
              className="object-contain opacity-40"
            />
          </div>

          {/* MAIN IMAGE (THE GUY) */}
          <div className="relative z-10 w-full aspect-[4/5]">
            <Image 
              src="/hero-man.png" // Placeholder for the man pointing
              alt="Find your dream job"
              fill
              className="object-contain"
              priority
            />
            
            {/* You can manually add the floating "Tags" here as absolute divs 
                if they aren't part of your main image file */}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;