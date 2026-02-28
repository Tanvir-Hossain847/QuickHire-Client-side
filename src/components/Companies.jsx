import React from 'react';

const companies = [
  { name: "Vodafone", url: "https://i.ibb.co.com/6RMmkqp6/vodafone-2017-logo.png" },
  { name: "Intel", url: "https://i.ibb.co.com/QFzHJySf/intel-3.png" },
  { name: "Tesla", url: "https://i.ibb.co.com/PvsdYdwm/tesla-9-1.png" },
  { name: "AMD", url: "https://i.ibb.co.com/q324CNn7/amd-logo-1.png" },
  { name: "Talkit", url: "https://i.ibb.co.com/zVH0M1Lm/talkit-1.png" },
];

export default function Companies() {
  return (
    <section className="w-full py-10 bg-[#F8F8FD]">
      <div className="max-w-11/12 mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-[#8e95ac] text-sm md:text-base font-medium mb-8 text-center lg:text-left">
          Companies we helped grow
        </p>
        <div className="flex flex-wrap justify-center lg:justify-between items-center gap-8 md:gap-12">
          {companies.map((company) => (
            <div key={company.name} className="flex justify-center items-center opacity-40 grayscale hover:opacity-100 hover:grayscale-0 transition-opacity transition-filter duration-300">
              <img 
                src={company.url} 
                alt={`${company.name} logo`} 
                className="h-6 sm:h-8 md:h-10 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
