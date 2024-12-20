import { ProfileTab } from "@/type/profile";

interface TabNavigationProps {
    activeTab: ProfileTab;
    onTabChange: (tab: ProfileTab) => void;
  }
  
  export const TabNavigation = ({ activeTab, onTabChange }: TabNavigationProps) => {
    return (
<div className="flex justify-center gap-8  mt-8">
  {[
    { id: 'coins-created', label: 'Coins Created' },
    { id: 'replies', label: 'Replies' },
  ].map((tab) => (
    <button
      key={tab.id}
      onClick={() => onTabChange(tab.id as ProfileTab)}
      className={`text-sm font-medium  relative ${
        activeTab === tab.id
          ? 'text-white bg-[#7E55FF] rounded px-4 py-2'
          : 'text-gray-400 hover:text-white'
      }`}
    >
      {tab.label}
    </button>
  ))}
</div>
    );
  };