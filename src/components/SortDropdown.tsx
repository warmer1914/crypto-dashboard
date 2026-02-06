'use client';

import { ChevronDown } from 'lucide-react';
import { SortField, SortOrder } from '@/types/crypto';

interface SortDropdownProps {
  sortField: SortField;
  sortOrder: SortOrder;
  onSortChange: (field: SortField, order: SortOrder) => void;
}

const sortOptions = [
  { value: 'market_cap_rank', label: 'Market Cap Rank' },
  { value: 'price_change_percentage_24h', label: '24h Change' },
  { value: 'market_cap', label: 'Market Cap' },
  { value: 'volume', label: 'Volume' },
] as const;

export default function SortDropdown({ sortField, sortOrder, onSortChange }: SortDropdownProps) {
  const handleFieldChange = (field: SortField) => {
    onSortChange(field, sortOrder);
  };

  const handleOrderToggle = () => {
    onSortChange(sortField, sortOrder === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div className="flex items-center space-x-2">
      <select
        value={sortField}
        onChange={(e) => handleFieldChange(e.target.value as SortField)}
        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:border-gray-600 dark:bg-gray-800 dark:text-white"
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      
      <button
        onClick={handleOrderToggle}
        className="flex items-center px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white"
        title={`Sort ${sortOrder === 'asc' ? 'Ascending' : 'Descending'}`}
      >
        <ChevronDown 
          className={`w-4 h-4 transition-transform ${sortOrder === 'desc' ? 'rotate-180' : ''}`} 
        />
      </button>
    </div>
  );
}




