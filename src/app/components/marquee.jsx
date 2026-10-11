import React from 'react';
import Link from 'next/link';
import Marquee from 'react-fast-marquee';

export const dynamic = "force-dynamic";

const PriceMarquee = async () => {
  const res = await fetch('https://openapi.programming-hero.com/api/bazardor/products', {
    cache: 'no-store'
  });
  const products = await res.json();

  if (!Array.isArray(products)) {
    return null;
  }

  return (
    <div className="w-full bg-gray-100 py-2 border-y">
      <Marquee speed={70} pauseOnHover={true} className="border-l border-gray-300">
        {products.map((item) => (
          <Link
            key={item.id}
            href={`/products/${item.id}`}
            className="flex items-center space-x-2 mr-8 text-sm hover:underline cursor-pointer"
          >
            <span>{item.categoryIcon}</span>
            <span className="font-medium text-black">{item.nameBn}</span>
            <span className="font-medium text-black">{item.today} টাকা/{item.unit}</span>
            <span className={item.change?.dir === 'up' ? 'text-red-500' : 'text-green-600'}>
              {item.change?.dir === 'up' ? '▲' : '▼'} {item.change?.pct}%
            </span>
          </Link>
        ))}
      </Marquee>
    </div>
  );
};

export default PriceMarquee;