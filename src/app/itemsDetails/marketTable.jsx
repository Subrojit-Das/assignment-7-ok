import React from 'react';

const MarketTable = ({ markets }) => {
  if (!markets || markets.length === 0) {
    return (
      <div className="p-4 bg-white rounded-2xl text-center text-gray-400">
        বাজারের তথ্য পাওয়া যায়নি।
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-x-auto">
      <table className="w-full text-left text-sm text-gray-600">
        <thead>
          <tr className="border-b border-gray-100 bg-gray-50 text-xs text-gray-500">
            <th className="py-3 px-4">বাজার</th>
            <th className="py-3 px-4">বিভাগ</th>
            <th className="py-3 px-4">সর্বনিম্ন</th>
            <th className="py-3 px-4">সর্বাধিক</th>
            <th className="py-3 px-4 text-right">গড়</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {markets.map((m, index) => {
            const avg = Math.round((m.min + m.max) / 2);
            return (
              <tr key={index} className="hover:bg-gray-50">
                <td className="py-3 px-4 font-semibold text-gray-900">{m.market}</td>
                <td className="py-3 px-4 text-gray-500">{m.division}</td>
                <td className="py-3 px-4">{m.min} টাকা</td>
                <td className="py-3 px-4">{m.max} টাকা</td>
                <td className="py-3 px-4 text-right font-bold text-gray-900">{avg} টাকা</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default MarketTable;