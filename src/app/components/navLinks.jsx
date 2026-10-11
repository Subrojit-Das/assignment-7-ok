
import React from 'react';
import Link from 'next/link';

const NavLinks = async () => {
  const res = await fetch('https://openapi.programming-hero.com/api/bazardor/categories', {
    cache: 'no-store'
  });
  const categories = await res.json();

  if (!Array.isArray(categories)) {
    return null;
  }

  return (
    <div className="w-full bg-[#f8f9fa] border-b border-gray-200">
      <div className=" container mx-auto px-4 py-3 sm:px-8 flex overflow-x-auto space-x-2">
      {categories.map((n) => (
        <Link
          key={n.id}
          href={`/oneProducts?category=${(n.category || n.slug || n.id)}`}
          className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-200/60 rounded-xl transition-all flex items-center gap-1 whitespace-nowrap"
        >
          <span>{n.icon}</span>
          <span>{n.nameBn}</span>
        </Link>
      ))}
    </div>
    </div>
  );
};

export default NavLinks;