import React from 'react';
import Image from 'next/image';

const HeroBanner = () => {
  return (
    <div className="w-full container mx-auto">
      <div className="relative overflow-hidden rounded-3xl bg-[#f8faf8] border border-gray-100 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm">
        <div className="flex-1 space-y-4 text-left">
          <div className="inline-block px-3 py-1 bg-[#e2f0e8] text-[#1b7e45] text-sm font-medium rounded-full">
            মঙ্গলবার, ৬ অক্টোবর, ২০২৬
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#111827] tracking-tight">
            আজকের বাজারের দাম এক নজরে
          </h1>

          <p className="text-gray-600 text-sm md:text-base leading-relaxed max-w-2xl">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>

          <div className="pt-2">
            <button href="../items/allProducts.jsx" className="px-6 py-3 bg-[#028a48] hover:bg-[#02753d] text-white font-medium text-sm rounded-lg transition-colors duration-200 shadow-md">
              সব পণ্য দেখুন
            </button>
          </div>
        </div>

        <div className="relative w-full md:w-80 h-64 shrink-0">
          <Image
            src="/ass/bazar-hero.png"
            alt="বাজারের ঝুড়ি"
            layout="fill"
            objectFit="cover"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;