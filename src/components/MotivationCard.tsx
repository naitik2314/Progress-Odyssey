import React from "react";
import { LightbulbIcon } from "lucide-react";
interface MotivationCardProps {
  className?: string;
}
export const MotivationCard = ({
  className = ""
}: MotivationCardProps) => {
  return <div className={`bg-gradient-to-r from-indigo-900/50 to-purple-900/50 border border-indigo-800/50 rounded-lg p-5 ${className}`}>
      <div className="flex items-start">
        <div className="bg-indigo-500/20 p-2 rounded-lg">
          <LightbulbIcon size={20} className="text-indigo-400" />
        </div>
        <div className="ml-4">
          <h3 className="font-medium">Daily Motivation</h3>
          <p className="mt-2 text-slate-300 text-sm">
            "Progress is not about perfection. It's about consistent small steps
            in the right direction."
          </p>
          <div className="mt-4">
            <button className="text-indigo-400 hover:text-indigo-300 text-sm font-medium">
              Get Another Quote
            </button>
          </div>
        </div>
      </div>
    </div>;
};