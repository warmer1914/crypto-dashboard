import { useState, useMemo } from 'react';
import { Activity, TrendingUp, DollarSign } from 'lucide-react';
import { useCryptoData } from '@/hooks/useCryptoData';
import { CryptoCurrency, SortField, SortOrder } from '@/types/crypto';
import SearchBar from '@/components/SearchBar';
import SortDropdown from '@/components/SortDropdown';
import CryptoCard from '@/components/CryptoCard';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorMessage from '@/components/ErrorMessage';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<SortField>('market_cap_rank');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const [showRealTime, setShowRealTime] = useState(false);

  const { data: cryptoData, isLoading, error, refetch } = useCryptoData();

  const filteredAndSortedData = useMemo(() => {
    if (!cryptoData) return [];

    let filtered = cryptoData;

    // Apply search filter
    if (searchQuery) {
      filtered = cryptoData.filter(
        (crypto) =>
          crypto.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          crypto.symbol.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue: number;
      let bValue: number;

      switch (sortField) {
        case 'market_cap_rank':
          aValue = a.market_cap_rank;
          bValue = b.market_cap_rank;
          break;
        case 'price_change_percentage_24h':
          aValue = a.price_change_percentage_24h;
          bValue = b.price_change_percentage_24h;
          break;
        case 'market_cap':
          aValue = a.market_cap;
          bValue = b.market_cap;
          break;
        case 'volume':
          aValue = a.total_volume;
          bValue = b.total_volume;
          break;
        default:
          aValue = a.market_cap_rank;
          bValue = b.market_cap_rank;
      }

      return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
    });

    return filtered;
  }, [cryptoData, searchQuery, sortField, sortOrder]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleSortChange = (field: SortField, order: SortOrder) => {
    setSortField(field);
    setSortOrder(order);
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 py-8">
          <ErrorMessage 
            message={error instanceof Error ? error.message : 'Failed to load cryptocurrency data'} 
            onRetry={() => refetch()} 
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Crypto Prices Dashboard
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Real-time cryptocurrency market data
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowRealTime(!showRealTime)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  showRealTime
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                }`}
              >
                <Activity className="w-4 h-4" />
                <span>Live Data</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Controls */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 mb-6">
          <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
            <SearchBar onSearch={handleSearch} />
            <SortDropdown
              sortField={sortField}
              sortOrder={sortOrder}
              onSortChange={handleSortChange}
            />
          </div>
          
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Showing {filteredAndSortedData.length} cryptocurrencies
          </div>
        </div>

        {/* Stats */}
        {cryptoData && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Market Cap</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    ${(cryptoData.reduce((sum, crypto) => sum + crypto.market_cap, 0) / 1e12).toFixed(2)}T
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                  <DollarSign className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400">24h Volume</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    ${(cryptoData.reduce((sum, crypto) => sum + crypto.total_volume, 0) / 1e9).toFixed(2)}B
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                  <Activity className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Active Cryptocurrencies</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {cryptoData.length}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Crypto Grid */}
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAndSortedData.map((crypto) => (
              <CryptoCard
                key={crypto.id}
                crypto={crypto}
                showRealTime={showRealTime}
              />
            ))}
          </div>
        )}

        {!isLoading && filteredAndSortedData.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              No cryptocurrencies found matching your search.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
