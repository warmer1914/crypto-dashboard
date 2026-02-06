import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { ArrowLeft, TrendingUp, TrendingDown, Activity } from 'lucide-react';
import { useCryptoData } from '@/hooks/useCryptoData';
import { CryptoCurrency } from '@/types/crypto';
import { formatCurrency, formatPercentage, formatNumber, getCryptoTradingViewSymbol } from '@/lib/api';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorMessage from '@/components/ErrorMessage';

export default function CryptoDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const { data: cryptoData, isLoading, error } = useCryptoData();
  const [crypto, setCrypto] = useState<CryptoCurrency | null>(null);
  const [chartLoaded, setChartLoaded] = useState(false);

  useEffect(() => {
    if (cryptoData && id) {
      const foundCrypto = cryptoData.find(c => c.id === id);
      setCrypto(foundCrypto || null);
    }
  }, [cryptoData, id]);

  useEffect(() => {
    if (!crypto) return;

    // 加载 TradingView Widget 脚本
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/tv.js';
    script.async = true;
    script.onload = () => {
      setChartLoaded(true);
      if (typeof window !== 'undefined' && (window as any).TradingView) {
        const symbol = getCryptoTradingViewSymbol(crypto.id, crypto.symbol);
        
        new (window as any).TradingView.widget({
          autosize: true,
          symbol: symbol,
          interval: 'D',
          timezone: 'Etc/UTC',
          theme: 'dark',
          style: '1',
          locale: 'zh_CN',
          toolbar_bg: '#f1f3f6',
          enable_publishing: false,
          allow_symbol_change: true,
          container_id: 'tradingview_chart',
          height: '100%',
          width: '100%',
          studies: [
            'Volume@tv-basicstudies'
          ],
          disabled_features: ['use_localstorage_for_settings'],
          enabled_features: ['study_templates'],
          loading_screen: { backgroundColor: '#131722' },
        });
      }
    };
    
    const existingScript = document.querySelector('script[src="https://s3.tradingview.com/tv.js"]');
    if (!existingScript) {
      document.head.appendChild(script);
    } else {
      setChartLoaded(true);
      if (typeof window !== 'undefined' && (window as any).TradingView) {
        const symbol = getCryptoTradingViewSymbol(crypto.id, crypto.symbol);
        
        new (window as any).TradingView.widget({
          autosize: true,
          symbol: symbol,
          interval: 'D',
          timezone: 'Etc/UTC',
          theme: 'dark',
          style: '1',
          locale: 'zh_CN',
          toolbar_bg: '#f1f3f6',
          enable_publishing: false,
          allow_symbol_change: true,
          container_id: 'tradingview_chart',
          height: '100%',
          width: '100%',
          studies: [
            'Volume@tv-basicstudies'
          ],
          disabled_features: ['use_localstorage_for_settings'],
          enabled_features: ['study_templates'],
          loading_screen: { backgroundColor: '#131722' },
        });
      }
    }

    return () => {
      // 清理函数
      const container = document.getElementById('tradingview_chart');
      if (container) {
        container.innerHTML = '';
      }
    };
  }, [crypto]);

  const handleBack = () => {
    router.push('/');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 py-8">
          <ErrorMessage 
            message={error instanceof Error ? error.message : '加载失败'} 
            onRetry={handleBack} 
          />
        </div>
      </div>
    );
  }

  if (!crypto) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            未找到该币种
          </h2>
          <button
            onClick={handleBack}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            返回首页
          </button>
        </div>
      </div>
    );
  }

  const isPositive = crypto.price_change_percentage_24h >= 0;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <button
            onClick={handleBack}
            className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>返回首页</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-160px)]">
          {/* Left Panel - Crypto Info */}
          <div className="w-full lg:w-[30%] space-y-6">
            {/* Crypto Header */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-4 mb-6">
                <div className="relative w-16 h-16">
                  <Image
                    src={crypto.image}
                    alt={crypto.name}
                    width={64}
                    height={64}
                    className="rounded-full"
                  />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {crypto.name}
                  </h1>
                  <p className="text-lg text-gray-500 dark:text-gray-400 uppercase">
                    {crypto.symbol}
                  </p>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    排名 #{crypto.market_cap_rank}
                  </span>
                </div>
              </div>

              {/* Price Info */}
              <div className="mb-6">
                <p className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                  {formatCurrency(crypto.current_price)}
                </p>
                <div className={`flex items-center space-x-2 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                  {isPositive ? (
                    <TrendingUp className="w-5 h-5" />
                  ) : (
                    <TrendingDown className="w-5 h-5" />
                  )}
                  <span className="text-lg font-medium">
                    {formatPercentage(crypto.price_change_percentage_24h)}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    24小时
                  </span>
                </div>
              </div>
            </div>

            {/* Detailed Stats */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700 overflow-y-auto max-h-[calc(100vh-400px)]">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                市场数据
              </h2>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-400">市值</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    ${formatNumber(crypto.market_cap)}
                  </span>
                </div>

                <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-400">24小时交易量</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    ${formatNumber(crypto.total_volume)}
                  </span>
                </div>

                <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-400">24小时最高</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {formatCurrency(crypto.high_24h)}
                  </span>
                </div>

                <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-400">24小时最低</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {formatCurrency(crypto.low_24h)}
                  </span>
                </div>

                <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-400">流通供应量</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {formatNumber(crypto.circulating_supply)}
                  </span>
                </div>

                {crypto.total_supply > 0 && (
                  <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700">
                    <span className="text-gray-600 dark:text-gray-400">总供应量</span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {formatNumber(crypto.total_supply)}
                    </span>
                  </div>
                )}

                {crypto.max_supply > 0 && (
                  <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700">
                    <span className="text-gray-600 dark:text-gray-400">最大供应量</span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {formatNumber(crypto.max_supply)}
                    </span>
                  </div>
                )}

                <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-400">历史最高</span>
                  <div className="text-right">
                    <div className="font-semibold text-gray-900 dark:text-white">
                      {formatCurrency(crypto.ath)}
                    </div>
                    <div className="text-sm text-red-600">
                      {formatPercentage(crypto.ath_change_percentage)}
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center py-3">
                  <span className="text-gray-600 dark:text-gray-400">历史最低</span>
                  <div className="text-right">
                    <div className="font-semibold text-gray-900 dark:text-white">
                      {formatCurrency(crypto.atl)}
                    </div>
                    <div className="text-sm text-green-600">
                      {formatPercentage(crypto.atl_change_percentage)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - TradingView Chart */}
          <div className="w-full lg:w-[70%] bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden">
            {!chartLoaded && (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <Activity className="w-12 h-12 text-gray-400 animate-spin mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-400">加载图表中...</p>
                </div>
              </div>
            )}
            <div id="tradingview_chart" className="w-full h-full min-h-[400px] lg:min-h-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
