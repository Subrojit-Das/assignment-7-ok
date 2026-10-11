"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const PriceDownProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('https://openapi.programming-hero.com/api/bazardor/products')
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));
  }, []);

  const decPro = products.filter(
    (item) => item.change && item.change.dir === 'down'
  );

  return (
    <div className="bg-[#f3f5f1] p-6 container mx-auto shadow-md">
      <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-4">
        <span className="text-green-600">
          ▼
        </span> আজ দাম কমেছে
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {decPro.map((item) => (
          <Link href={`/products/${item.id}`} key={item.id}>
            <div className="bg-white rounded-2xl p-5 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow cursor-pointer h-full">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-2xl">
                  {item.image || item.categoryIcon}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{item.nameBn}</h3>
                  <p className="text-sm text-gray-500">প্রতি {item.unit}</p>
                </div>
              </div>

              <div className="flex justify-between items-end">
                <div>
                  <p className="text-xs text-gray-500">আজকের দাম</p>
                  <p className="text-xl font-bold text-gray-900">
                    {item.today} টাকা
                  </p>
                </div>

                <div className="bg-green-50 text-green-600 px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                  ▼ {Math.abs(item.change.pct)}%
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PriceDownProducts;