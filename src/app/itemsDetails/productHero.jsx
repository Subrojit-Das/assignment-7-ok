import React from 'react';

const ProductHero = ({ product }) => {
  const diff = Math.abs((product?.today || 0) - (product?.yesterday || 0));
  const isUp = product?.change?.dir === 'up';
  const isDown = product?.change?.dir === 'down';

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between gap-6">
      <div className="flex items-start gap-4">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-3xl">
          {product?.image || product?.categoryIcon || '🛒'}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{product?.nameBn}</h1>
          <p className="text-xs text-gray-400 mt-1">
            প্রতি {product?.unit === 'kg' ? 'কেজি' : product?.unit} • {product?.categoryNameBn}
          </p>
          <p className="text-xs text-gray-500 mt-2">
            গতকালকের তুলনায় আজ দাম{' '}
            <span className={isUp ? 'text-red-600 font-bold' : isDown ? 'text-green-600 font-bold' : ''}>
              {isUp ? `বেড়েছে - ${diff} টাকা` : isDown ? `কমেছে - ${diff} টাকা` : 'একই আছে'}
            </span>
          </p>
        </div>
      </div>

      <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 text-center md:text-right">
        <span className="text-xs text-gray-400">আজকের দাম</span>
        <div className="text-3xl font-bold text-gray-900 mt-1">
          {product?.today}
        </div>
        <span className="text-xs text-gray-400">
          টাকা / {product?.unit === 'kg' ? 'কেজি' : product?.unit}
        </span>
        <span className={product?.change?.dir === 'up' ? 'text-red-500' : 'text-green-600'}>
              {product?.change?.dir === 'up' ? '▲' : '▼'} {product?.change?.pct}%
            </span>
      </div>
    </div>
  );
};

export default ProductHero;