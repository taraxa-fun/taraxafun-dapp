// components/TokenFilter.tsx
import { Switch } from "@/components/ui/switch";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SortOption } from "@/type/sortOption";
import { SortOrder } from "@/type/sortOrder";
import { useFilterStore } from "@/store/useFilterStore";

export const TokenFilter = () => {
  const {
    showAnimation,
    showNSFW,
    selectedSort,
    toggleAnimation,
    toggleNSFW,
    setSort,
    sortOrder,
  } = useFilterStore();
  return (
<section className="w-full flex flex-wrap lg:flex-nowrap items-center gap-4 p-4 rounded-lg">
  <div className="flex gap-4 w-full md:w-auto">
    <div
      className={`flex-1 ${
        selectedSort === "creationTime" ? "md:w-[180px]" : "md:w-full"
      }`}
    >
      <Select value={selectedSort} onValueChange={setSort}>
        <SelectTrigger className="w-full bg-[#9A62FF]">
          <SelectValue placeholder={`sort: ${selectedSort}`} />
        </SelectTrigger>
        <SelectContent className="bg-[#9A62FF]">
          <SelectItem value="featured" className="text-white">
            featured 🔥
          </SelectItem>
          <SelectItem value="lastTrade" className="text-white">
            last trade
          </SelectItem>
          <SelectItem value="creationTime" className="text-white">
            creation time
          </SelectItem>
          <SelectItem value="lastReply" className="text-white">
            last reply
          </SelectItem>
          <SelectItem value="marketCap" className="text-white">
            market cap
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
    {selectedSort === "creationTime" && (
      <div className="flex-1 md:w-[120px]">
        <Select
          value={`${selectedSort}-${sortOrder}`}
          onValueChange={(value) => {
            const [sort, order] = value.split("-");
            setSort(sort as SortOption, order as SortOrder);
          }}
        >
          <SelectTrigger className="w-full bg-[#9A62FF]">
            <SelectValue
              placeholder={`order: ${sortOrder === "asc" ? "asc" : "desc"}`}
            />
          </SelectTrigger>
          <SelectContent className="bg-[#9A62FF]">
            <SelectItem value={`creationTime-asc`} className="text-white">
              order: asc
            </SelectItem>
            <SelectItem value={`creationTime-desc`} className="text-white">
              order: desc
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    )}
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
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-white">Include NSFW</span>
      <label className="inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          className="sr-only peer"
          checked={showNSFW}
          onChange={toggleNSFW}
        />
        <div className="relative w-10 h-6 bg-red-500 rounded-full peer peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#79FF62]" />
      </label>
    </div>
  </div>
</section>
  );
};
