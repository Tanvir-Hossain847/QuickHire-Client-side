import Hero from "@/components/Hero";
import Companies from "@/components/Companies";
import ExploreByCategory from "@/components/ExploreByCategory";
import FeaturedJobs from "@/components/FeaturedJobs";
import LatestJobs from "@/components/LatestJobs";
import Image from "next/image";
import CTA from "@/components/CTA";

export default function Home() {
  return (
    <div className="bg-[#F8F8FD] min-h-screen">
      <Hero />
      <Companies />
      <ExploreByCategory />
      <CTA />
      <FeaturedJobs />
      <LatestJobs />
    </div>
  );
}
