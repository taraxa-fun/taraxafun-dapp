export const formatMarketCap = (marketcap: string | number): string => {
    try {
      const number = Number(marketcap);
      if (isNaN(number)) return "0";
      
      const formatted = (number / 1000000).toFixed(2);
      return formatted;
    } catch (error) {
      return "0";
    }
  };