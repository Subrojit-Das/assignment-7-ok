 "use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch('https://openapi.programming-hero.com/api/bazardor/products')
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="bg-[#f3f5f1] p-6 container mx-auto shadow-md">
      <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-4">
        <svg className='bg-amber-800' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M240-80q-33 0-56.5-23.5T160-160v-480q0-33 23.5-56.5T240-720h80q0-66 47-113t113-47q66 0 113 47t47 113h80q33 0 56.5 23.5T800-640v480q0 33-23.5 56.5T720-80H240Zm0-80h480v-480h-80v80q0 17-11.5 28.5T600-520q-17 0-28.5-11.5T560-560v-80H400v80q0 17-11.5 28.5T360-520q-17 0-28.5-11.5T320-560v-80h-80v480Zm160-560h160q0-33-23.5-56.5T480-800q-33 0-56.5 23.5T400-720ZM240-160v-480 480Z"/></svg> সকল পণ্য
      </h2>
      <p className="text-gray-600 mb-4">মোট {products.length} পণ্য দেখানো হচ্ছে
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((item) => (
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
                {item.change && (
                  <div
                    className={`px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1 ${
                      item.change.dir === 'up'
                        ? 'bg-red-50 text-red-600'
                        : item.change.dir === 'down'
                        ? 'bg-green-50 text-green-600'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    <span>
                      {item.change.dir === 'up' ? (
                        "▲"
                      ) : item.change.dir === 'down' ? (
                        '▼'
                      ) : (
                        <span className="text-xs">—</span>
                      )}
                    </span>
                    {item.change.dir === 'flat' ? '0.00%' : `${Math.abs(item.change.pct)}%`}
                  </div>
                )}
              </div>
            </div>
          </Link>

        ))}

      </div>

    </div>

  );

};


export default AllProducts;