import React from "react";
import { TrophyIcon, ZapIcon, StarIcon } from "lucide-react";
export const Avatar = () => {
  return <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
      <div className="flex flex-col items-center">
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-600 to-purple-700 flex items-center justify-center border-4 border-slate-700">
            <img src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="User avatar" className="w-full h-full rounded-full object-cover" />
          </div>
          <div className="absolute bottom-0 right-0 bg-yellow-500 rounded-full p-1 border-2 border-slate-700">
            <StarIcon size={14} className="text-slate-900" />
          </div>
        </div>
        <h2 className="text-xl font-bold mt-4">Jane Smith</h2>
        <p className="text-indigo-400 text-sm font-medium">Level 24 Explorer</p>
        <div className="flex items-center justify-center gap-4 mt-4 w-full">
          <div className="flex flex-col items-center">
            <div className="bg-slate-700 p-2 rounded-lg">
              <TrophyIcon size={18} className="text-yellow-500" />
            </div>
            <span className="text-xs mt-1 text-slate-400">28</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-slate-700 p-2 rounded-lg">
              <ZapIcon size={18} className="text-emerald-400" />
            </div>
            <span className="text-xs mt-1 text-slate-400">14 Day</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-slate-700 p-2 rounded-lg">
              <StarIcon size={18} className="text-purple-400" />
            </div>
            <span className="text-xs mt-1 text-slate-400">Elite</span>
          </div>
        </div>
        <div className="w-full mt-6">
          <div className="flex justify-between mb-1 text-xs">
            <span className="text-slate-400">Progress to Level 25</span>
            <span className="text-white font-medium">65%</span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2.5">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2.5 rounded-full" style={{
            width: "65%"
          }}></div>
          </div>
        </div>
      </div>
    </div>;
};