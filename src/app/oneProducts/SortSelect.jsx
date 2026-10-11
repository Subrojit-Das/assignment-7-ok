'use client';

import { useRouter, useSearchParams } from 'next/navigation';

export default function SortSelect({ currentSort }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSortChange = (e) => {
    const params = new URLSearchParams(searchParams.toString());
    const val = e.target.value;
    if (val) {
      params.set('sort', val);
    } else {
      params.delete('sort');
    }
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex items-center gap-2 text-sm text-gray-600">
      <span>সাজান</span>
      <select
        value={currentSort}
        onChange={handleSortChange}
        className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 text-sm font-medium text-gray-700 outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer"
      >
        <option value="">ডিফল্ট</option>
        <option value="asc">দাম: কম থেকে বেশি</option>
        <option value="desc">দাম: বেশি থেকে কম</option>
      </select>
    </div>
  );
}