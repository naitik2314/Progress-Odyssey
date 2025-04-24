import React from "react";
import { Avatar } from "./Avatar";
import { ProgressCard } from "./ProgressCard";
import { QuestLog } from "./QuestLog";
import { BadgeCollection } from "./BadgeCollection";
import { MotivationCard } from "./MotivationCard";
import { BellIcon, ChevronRightIcon } from "lucide-react";
export const Dashboard = () => {
  return <div className="max-w-7xl mx-auto">
      {/* Welcome header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">
            Welcome back, Explorer!
          </h1>
          <p className="text-slate-400 mt-1">
            Continue your journey to productivity mastery
          </p>
        </div>
        <button className="hidden md:flex items-center bg-slate-700 hover:bg-slate-600 text-white rounded-lg px-4 py-2 text-sm transition-colors">
          <BellIcon size={16} className="mr-2" />
          <span>Notifications</span>
          <span className="ml-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            3
          </span>
        </button>
      </div>
      {/* Main grid layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column - Avatar and stats */}
        <div className="lg:col-span-1">
          <Avatar />
          <div className="mt-6 grid grid-cols-2 gap-4">
            <ProgressCard title="Current Level" value="24" subtitle="Explorer Rank" color="indigo" percentage={65} />
            <ProgressCard title="XP Points" value="3,240" subtitle="Next: 4,000" color="emerald" percentage={81} />
          </div>
          <MotivationCard className="mt-6" />
        </div>
        {/* Right column - Quests and achievements */}
        <div className="lg:col-span-2">
          <QuestLog />
          <div className="mt-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Recent Achievements</h2>
              <button className="text-indigo-400 hover:text-indigo-300 text-sm flex items-center">
                View All <ChevronRightIcon size={16} className="ml-1" />
              </button>
            </div>
            <BadgeCollection />
          </div>
        </div>
      </div>
    </div>;
};