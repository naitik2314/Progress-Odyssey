import React from "react";
import { MenuIcon, BellIcon } from "lucide-react";
interface MobileHeaderProps {
  openSidebar: () => void;
}
export const MobileHeader = ({
  openSidebar
}: MobileHeaderProps) => {
  return <header className="bg-slate-800 border-b border-slate-700 p-4 flex justify-between items-center">
      <div className="flex items-center">
        <button onClick={openSidebar} className="text-slate-400 hover:text-white mr-4">
          <MenuIcon size={22} />
        </button>
        <div className="flex items-center">
          <div className="w-7 h-7 rounded-full bg-indigo-500 flex items-center justify-center">
            <span className="font-bold text-white text-xs">PO</span>
          </div>
          <h1 className="text-lg font-bold ml-2 text-white">
            Progress Odyssey
          </h1>
        </div>
      </div>
      <button className="text-slate-400 hover:text-white relative">
        <BellIcon size={20} />
        <span className="absolute -top-1 -right-1 bg-red-500 rounded-full w-4 h-4 text-xs flex items-center justify-center">
          3
        </span>
      </button>
    </header>;
};