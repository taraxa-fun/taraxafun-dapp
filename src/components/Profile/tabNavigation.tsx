import { ProfileTab } from "@/type/profile";

interface TabNavigationProps {
    activeTab: ProfileTab;
    onTabChange: (tab: ProfileTab) => void;
  }
  
  export const TabNavigation = ({ activeTab, onTabChange }: TabNavigationProps) => {
    return (
      <div className="flex justify-center gap-8 border-b border-gray-700 mt-8">
        {[
          { id: 'coins-held', label: 'Coins Held' },
          { id: 'coins-created', label: 'Coins Created' },
          { id: 'replies', label: 'Replies' },
          { id: 'following', label: 'Following' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id as ProfileTab)}
            className={`pb-4 text-sm font-medium transition-colors relative ${
              activeTab === tab.id
                ? 'text-white after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#79FF62]'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    );
  };