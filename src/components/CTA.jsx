"use client";
import React from 'react'
import Image from "next/image";

export default function CTA() {
  return (
    <div>
     <section className="relative w-full bg-white py-15 px-4 md:px-8 overflow-hidden">
      <div className="max-w-11/12 mx-auto">
        <div className="relative rounded-2xl overflow-hidden min-h-[320px] flex items-center">
          {/* Background image */}
          <div className="inset-0 z-0">
            <Image
              src="https://i.ibb.co.com/8LzsQpSt/Rectangle-2742.png"
              alt="Hero background"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Left text content */}
          <div className="relative z-10 flex-1 ml-15 px-10 py-12 max-w-lg">
            <h1 className="text-white font-semibold text-4xl md:text-5xl leading-tight mb-4">
              Start posting jobs today
            </h1>
            <p className="text-white/80 text-base mb-8">
              Start posting jobs for only $10.
            </p>
            <a
              href="#"
              className="inline-block bg-white text-[#3d35c8] font-bold text-sm px-7 py-3 rounded-md border-2 border-white hover:bg-transparent hover:text-white transition-colors duration-200"
            >
              Sign Up For Free
            </a>
          </div>

          {/* Dashboard image */}
          <div className="relative z-10 flex-1 flex justify-end items-end">
            <div className="relative w-full max-w-[570px] aspect-[580/380] mr-15">
              <Image
                src="https://i.ibb.co.com/qM7hnB1g/3-1-Dashboard-Company.png"
                alt="QuickHire Dashboard"
                fill
                className="object-contain object-bottom drop-shadow-2xl rounded-tl-xl"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
    </div>
  )
}
