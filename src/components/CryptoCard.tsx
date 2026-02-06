'use client';

import Image from 'next/image';
import { useRouter } from 'next/router';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';
import { CryptoCurrency } from '@/types/crypto';
import { formatCurrency, formatPercentage, formatNumber } from '@/lib/api';
import { useWebSocket } from '@/hooks/useWebSocket';

interface CryptoCardProps {
  crypto: CryptoCurrency;
  showRealTime?: boolean;
}

export default function CryptoCard({ crypto, showRealTime = false }: CryptoCardProps) {
  const router = useRouter();
  const { priceData, isConnected } = useWebSocket(showRealTime ? crypto.symbol : '');

  const currentPrice = priceData?.data.c ? parseFloat(priceData.data.c) : crypto.current_price;
  const priceChange = priceData?.data.P ? parseFloat(priceData.data.P) : crypto.price_change_percentage_24h;
  const volume = priceData?.data.q ? parseFloat(priceData.data.q) : crypto.total_volume;

  const isPositive = priceChange >= 0;
  const isNegative = priceChange < 0;

  const handleClick = () => {
    router.push(`/crypto/${crypto.id}`);
  };

  return (
    <div 
      onClick={handleClick}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-all duration-200 p-6 border border-gray-200 dark:border-gray-700 cursor-pointer hover:scale-[1.02] transform"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="relative w-10 h-10">
            <Image
              src={crypto.image}
              alt={crypto.name}
              width={40}
              height={40}
              className="rounded-full"
            />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              {crypto.name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 uppercase">
              {crypto.symbol}
            </p>
          </div>
        </div>
        
        <div className="text-right">
          <div className="flex items-center space-x-1">
            <span className="text-sm text-gray-500 dark:text-gray-400">#{crypto.market_cap_rank}</span>
            {showRealTime && (
              <div className="flex items-center space-x-1">
                <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`} />
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {isConnected ? 'Live' : 'Offline'}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {formatCurrency(currentPrice)}
          </p>
          <div className={`flex items-center space-x-1 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {isPositive ? (
              <TrendingUp className="w-4 h-4" />
            ) : (
              <TrendingDown className="w-4 h-4" />
            )}
            <span className="text-sm font-medium">
              {formatPercentage(priceChange)}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-500 dark:text-gray-400">Market Cap</p>
            <p className="font-semibold text-gray-900 dark:text-white">
              ${formatNumber(crypto.market_cap)}
            </p>
          </div>
          <div>
            <p className="text-gray-500 dark:text-gray-400">Volume</p>
            <p className="font-semibold text-gray-900 dark:text-white">
              ${formatNumber(volume)}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <div>
            <p className="text-gray-500 dark:text-gray-400">24h High</p>
            <p className="font-semibold text-gray-900 dark:text-white">
              {formatCurrency(crypto.high_24h)}
            </p>
          </div>
          <div>
            <p className="text-gray-500 dark:text-gray-400">24h Low</p>
            <p className="font-semibold text-gray-900 dark:text-white">
              {formatCurrency(crypto.low_24h)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}




