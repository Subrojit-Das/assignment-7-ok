"use client";

import React from 'react';
import ProductHero from './productHero';
import MarketTable from './marketTable';
import Link from 'next/link';
import { useSession } from '../../lib/auth-client';

const ProductDetails = ({ product }) => {
  const { data: session, isPending } = useSession();

  if (!product) {
    return (
      <div className="p-8 text-center text-gray-500">
        পণ্য খুঁজে পাওয়া যায়নি।
      </div>
    );
  }

  if (isPending) {
    return (
      <div className="bg-[#f4f6f3] flex items-center justify-center">
        <p className="text-gray-500 font-medium">লোড হচ্ছে...</p>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="bg-[#f4f6f3] p-4 sm:p-8 text-gray-800 flex items-center justify-center">
        <div className="max-w-md w-full bg-white p-6 rounded-2xl border border-gray-200 text-center space-y-4 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900">লগইন প্রয়োজন</h2>
          <p className="text-sm text-gray-600">
            এই পণ্যের বিস্তারিত এবং দামের সারসংক্ষেপ দেখতে হলে তোকে প্রথমে লগইন করতে হবে।
          </p>
          <div className="flex justify-center gap-3 pt-2">
            <Link
              href="/sign-in"
              className="px-5 py-2.5 text-sm font-semibold text-white bg-[#0f8a42] hover:bg-[#0c7337] rounded-xl transition-all"
            >
              Sign In
            </Link>
            <Link
              href="/sign-up"
              className="px-5 py-2.5 text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const allMins = product.markets?.map((m) => m.min) || [];
  const allMaxs = product.markets?.map((m) => m.max) || [];

  const lowestPrice = allMins.length > 0 ? Math.min(...allMins) : product.today;
  const highestPrice = allMaxs.length > 0 ? Math.max(...allMaxs) : product.today;

  return (
    <div className=" bg-[#f4f6f3] px-4 py-6 sm:px-8 text-gray-800">
      <div className="container mx-auto space-y-6">
        <div className="text-xs text-gray-500 flex gap-2">
          <Link href="/" className="text-blue-500 hover:text-blue-700">
            হোম
          </Link>
          <span>-</span>
          <Link href={`/oneProducts?category=${product.category || product.categoryId}`} className="text-blue-500 hover:text-blue-700">
            {product.categoryNameBn}
          </Link>
          <span>-</span>
          <Link href={`/products/${product.id}`} className="font-bold text-blue-500 hover:text-blue-700">
            {product.nameBn}
          </Link>
        </div>

        <ProductHero product={product} />

        <div>
          <h2 className="text-base font-bold text-gray-900 mb-3">দামের সারসংক্ষেপ</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-2xl border border-gray-100">
              <span className="text-xs text-gray-400">সর্বনিম্ন দাম</span>
              <div className="text-xl font-bold text-green-600 mt-1">{lowestPrice} টাকা</div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-gray-100">
              <span className="text-xs text-gray-400">সর্বাধিক দাম</span>
              <div className="text-xl font-bold text-red-600 mt-1">{highestPrice} টাকা</div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-gray-100">
              <span className="text-xs text-gray-400">গড় দাম</span>
              <div className="text-xl font-bold text-emerald-700 mt-1">{product.today} টাকা</div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-base font-bold text-gray-900 mb-3">বাজারভিত্তিক আজকের দাম</h2>
          <MarketTable markets={product.markets} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;