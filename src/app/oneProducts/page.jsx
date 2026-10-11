import React from 'react';
import Link from 'next/link';
import SortSelect from './SortSelect';

const OneProductsPage = async ({ searchParams }) => {
  const resolvedSearchParams = await searchParams;
  const category = resolvedSearchParams?.category || '';
  const sort = resolvedSearchParams?.sort || '';

  let products = [];
  try {
    const res = await fetch(
      `https://openapi.programming-hero.com/api/bazardor/products?category=${category}`
    );
    if (res.ok) {
      products = await res.json();
    }
  } catch (error) {
    console.error("Data fetch error:", error);
  }

  if (sort === 'asc') {
    products.sort((a, b) => (a.today || 0) - (b.today || 0));
  } else if (sort === 'desc') {
    products.sort((a, b) => (b.today || 0) - (a.today || 0));
  }

  const categoryName = products.length > 0 && products[0].categoryNameBn
    ? products[0].categoryNameBn
    : (category || 'পণ্য');

  const categoryIcon = products.length > 0 && products[0].categoryIcon
    ? products[0].categoryIcon
    : '';

  return (
    <div className="bg-[#f4f6f3] p-4 sm:p-8 text-gray-800">
      <div className="max-w-6xl mx-auto space-y-6">
        
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center text-3xl shadow-inner">
            {categoryIcon}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{categoryName}</h1>
            <p className="text-sm text-gray-500 mt-0.5">
              {products.length}টি পণ্যের আজকের দাম ও পরিবর্তন
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center justify-end">
          <SortSelect currentSort={sort} />
        </div>

        <p className="text-xs text-gray-500 font-medium px-1">
          মোট {products.length}টি পণ্য দেখানো হচ্ছে
        </p>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((item) => (
              <Link key={item.id} href={`/products/${item.id}`} className="block">
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all flex flex-col justify-between h-full cursor-pointer">
                  <div>
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-xl shrink-0 border border-gray-100">
                        {item.image || item.categoryIcon || '🌾'}
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 text-base leading-snug">
                          {item.nameBn}
                        </h3>
                        <p className="text-xs text-gray-400 font-medium mt-0.5">
                          প্রতি {item.unit === 'kg' ? 'কেজি' : item.unit}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex items-end justify-between">
                    <div>
                      <span className="block text-xs text-gray-400 font-medium mb-0.5">
                        আজকের দাম
                      </span>
                      <span className="text-xl font-extrabold text-gray-900 tracking-tight">
                        {item.today} <span className="text-sm font-semibold">টাকা</span>
                      </span>
                    </div>

                    {item.change && (
                      <div
                        className={`px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1 ${
                          item.change.dir === 'up'
                            ? 'bg-rose-50 text-rose-600'
                            : item.change.dir === 'down'
                            ? 'bg-emerald-50 text-emerald-600'
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        <span>
                          {item.change.dir === 'up' && '▲ '}
                          {item.change.dir === 'down' && '▼'}
                          {item.change.dir === 'flat' && '—'}
                        </span>
                        <span>{Math.abs(item.change.pct)}%</span>
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center text-gray-400 font-medium border border-gray-100">
            কোনো পণ্য পাওয়া যায়নি।
          </div>
        )}

      </div>
    </div>
  );
};

export default OneProductsPage;