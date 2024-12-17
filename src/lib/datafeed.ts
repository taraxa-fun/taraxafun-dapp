import {
    DatafeedConfiguration,
    OnReadyCallback,
  } from 'charting_library';
  
  // Configuration complète de la Datafeed
  const configuration: DatafeedConfiguration = {
    supported_resolutions: ['1', '5', '15', '30', '60', 'D', 'W', 'M'], // Résolutions supportées
    exchanges: [
      { value: 'MOCK', name: 'Mock Exchange', desc: 'Test Exchange' },
      { value: 'BINANCE', name: 'Binance', desc: 'Binance Crypto Exchange' },
    ],
    symbols_types: [
      { name: 'crypto', value: 'crypto' },
      { name: 'stock', value: 'stock' },
      { name: 'forex', value: 'forex' },
    ],
    supports_marks: false, // Pas de marqueurs sur les bougies
    supports_timescale_marks: false, // Pas de marqueurs sur la timescale
    supports_time: true, // Fournit le temps du serveur
    currency_codes: [
      { id: 'USD', code: 'USD', description: '$' },
      { id: 'EUR', code: 'EUR', description: '€' },
    ],
    symbols_grouping: {
      futures: `/^(.+)([12]!|[FGHJKMNQUVXZ]\\d{1,2})$/`,
      stock: `/^(.+)([12]!|[FGHJKMNQUVXZ]\\d{1,2})$/`,
    },
    units: {
      weight: [
        { id: 'kg', name: 'kg', description: 'Kilograms' },
        { id: 'lb', name: 'lb', description: 'Pounds' },
      ],
    },
  };
  
  export default configuration;
  