import React from "react";
import { HomeIcon, TrophyIcon, BarChart3Icon, MapIcon, ShoppingBagIcon, SettingsIcon, HelpCircleIcon, XIcon } from "lucide-react";
interface SidebarProps {
  closeSidebar: () => void;
}
export const Sidebar = ({
  closeSidebar
}: SidebarProps) => {
  return <div className="h-full w-64 bg-slate-800 border-r border-slate-700 flex flex-col">
      {/* Logo and close button */}
      <div className="p-4 flex items-center justify-between border-b border-slate-700">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center">
            <span className="font-bold text-white">PO</span>
          </div>
          <h1 className="text-xl font-bold ml-2 text-white">
            Progress Odyssey
          </h1>
        </div>
        <button onClick={closeSidebar} className="md:hidden text-slate-400 hover:text-white">
          <XIcon size={20} />
        </button>
      </div>
      {/* Navigation links */}
      <nav className="flex-1 pt-4">
        <NavItem icon={<HomeIcon size={18} />} label="Dashboard" active />
        <NavItem icon={<MapIcon size={18} />} label="Quests" />
        <NavItem icon={<TrophyIcon size={18} />} label="Achievements" />
        <NavItem icon={<BarChart3Icon size={18} />} label="Progress" />
        <NavItem icon={<ShoppingBagIcon size={18} />} label="Rewards" />
        <div className="mt-8 border-t border-slate-700 pt-4">
          <NavItem icon={<SettingsIcon size={18} />} label="Settings" />
          <NavItem icon={<HelpCircleIcon size={18} />} label="Help" />
        </div>
      </nav>
      {/* User profile */}
      <div className="p-4 border-t border-slate-700 flex items-center">
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center">
          <span className="font-semibold">JS</span>
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium">Jane Smith</p>
          <p className="text-xs text-slate-400">Level 24 Explorer</p>
        </div>
      </div>
    </div>;
};
interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}
const NavItem = ({
  icon,
  label,
  active = false
}: NavItemProps) => {
  return <a href="#" className={`flex items-center px-4 py-3 text-sm ${active ? "bg-slate-700 text-white font-medium border-l-2 border-indigo-500" : "text-slate-400 hover:bg-slate-700/50 hover:text-white"}`}>
      <span className="mr-3">{icon}</span>
      {label}
    </a>;
};