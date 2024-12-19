// components/TokenFilter.tsx
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useTokenStore } from "@/store/useAllTokenStore";
import { useAnimationStore } from "@/store/useAnimationStore";

type SortByValue = 'marketcap' | 'last-comment' | 'last-trade' | 'created-at';

export const TokenFilter = () => {

  const { setSortBy, sortBy } = useTokenStore();
  const {showAnimation, toggleAnimation} = useAnimationStore()

  return (
    <section className="w-full flex flex-wrap lg:flex-nowrap items-center gap-4 p-4 rounded-lg">
      <div className="flex gap-4 w-full md:w-auto">
        <div className="flex-1">
          <Select 
            value={sortBy} 
            onValueChange={(value: SortByValue) => setSortBy(value)}
          >
            <SelectTrigger className="w-full bg-[#9A62FF]">
              <SelectValue placeholder={`sort: ${sortBy}`} />
            </SelectTrigger>
            <SelectContent className="bg-[#9A62FF]">
              <SelectItem value="marketcap" className="text-white">
                market cap 
              </SelectItem>
              <SelectItem value="last-comment" className="text-white">
                last reply
              </SelectItem>
              <SelectItem value="last-trade" className="text-white">
                last trade
              </SelectItem>
              <SelectItem value="created-at" className="text-white">
                creation time
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex w-full flex-col gap-4 lg:flex-nowrap lg:w-auto">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-white">Show animations</span>
          <label className="inline-flex items-center cursor-pointer">
           
            <input
              type="checkbox"
              className="sr-only peer"
              checked={showAnimation}
              onChange={toggleAnimation}
            />
       
            <div className="relative w-11 h-6 bg-red-500 rounded-full peer peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#79FF62]" />
          </label>
        </div>
      </div>
    </section>
  );
};
