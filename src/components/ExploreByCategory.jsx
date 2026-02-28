import React from 'react';
import { PenTool, LineChart, Megaphone, Wallet, Monitor, Code, Briefcase, Users, ArrowRight } from 'lucide-react';

const categories = [
  {
    id: 1,
    title: 'Design',
    jobs: '235 jobs available',
    icon: PenTool,
    isActive: false,
  },
  {
    id: 2,
    title: 'Sales',
    jobs: '756 jobs available',
    icon: LineChart,
    isActive: false,
  },
  {
    id: 3,
    title: 'Marketing',
    jobs: '140 jobs available',
    icon: Megaphone,
    isActive: true,
  },
  {
    id: 4,
    title: 'Finance',
    jobs: '325 jobs available',
    icon: Wallet,
    isActive: false,
  },
  {
    id: 5,
    title: 'Technology',
    jobs: '436 jobs available',
    icon: Monitor,
    isActive: false,
  },
  {
    id: 6,
    title: 'Engineering',
    jobs: '542 jobs available',
    icon: Code,
    isActive: false,
  },
  {
    id: 7,
    title: 'Business',
    jobs: '211 jobs available',
    icon: Briefcase,
    isActive: false,
  },
  {
    id: 8,
    title: 'Human Resource',
    jobs: '346 jobs available',
    icon: Users,
    isActive: false,
  },
];

export default function ExploreByCategory() {
  return (
    <section className="w-full py-16 bg-white">
      <div className="max-w-11/12 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
          <h2 className="text-3xl md:text-5xl font-semibold text-[#202941] tracking-tight">
            Explore by <span className="text-[#3393FF]">category</span>
          </h2>
          <a href="#" className="flex items-center text-[#5848DF] font-semibold hover:underline mt-4 md:mt-0">
            Show all jobs <ArrowRight className="ml-2 w-5 h-5 font-bold" />
          </a>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 sm:gap-6 border-b sm:border-b-0 border-[#f1f2f6]">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <div 
                key={category.id}
                className={`flex flex-col p-8 sm:p-6 lg:p-8 rounded-none border border-[#f1f2f6] sm:border transition-all duration-300 hover:shadow-xl cursor-pointer group ${
                  category.isActive 
                    ? 'bg-[#4F46E5]' 
                    : 'bg-white hover:border-[#e2e4ec]'
                }`}
              >
                <div className={`mb-8 ${category.isActive ? 'text-white' : 'text-[#4F46E5] group-hover:text-[#4F46E5]'} transition-colors duration-300`}>
                  <Icon className="w-10 h-10" strokeWidth={1.5} />
                </div>
                <h3 className={`text-xl font-bold mb-3 ${category.isActive ? 'text-white' : 'text-[#202941] group-hover:text-[#202941]'} transition-colors duration-300`}>
                  {category.title}
                </h3>
                <div className="flex items-center justify-between w-full mt-auto">
                  <span className={`text-[15px] font-medium ${category.isActive ? 'text-[#e0e7ff]' : 'text-[#8e95ac]'} transition-colors duration-300`}>
                    {category.jobs}
                  </span>
                  <ArrowRight className={`w-5 h-5 ${category.isActive ? 'text-white' : 'text-[#202941] group-hover:text-[#5848DF]'} transition-colors duration-300`} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
