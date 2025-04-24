import React from "react";
import { TrophyIcon, ZapIcon, BrainIcon, StarIcon, HeartIcon } from "lucide-react";
export const BadgeCollection = () => {
  return <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
      <Badge icon={<TrophyIcon size={24} className="text-yellow-500" />} title="First Victory" description="Completed your first quest" bgColor="bg-yellow-500/10" borderColor="border-yellow-500/20" />
      <Badge icon={<ZapIcon size={24} className="text-blue-500" />} title="Streak Master" description="7 day activity streak" bgColor="bg-blue-500/10" borderColor="border-blue-500/20" />
      <Badge icon={<BrainIcon size={24} className="text-purple-500" />} title="Knowledge Seeker" description="Completed 5 learning quests" bgColor="bg-purple-500/10" borderColor="border-purple-500/20" />
      <Badge icon={<StarIcon size={24} className="text-emerald-500" />} title="Rising Star" description="Reached level 20" bgColor="bg-emerald-500/10" borderColor="border-emerald-500/20" new />
      <Badge icon={<HeartIcon size={24} className="text-rose-500" />} title="Team Player" description="Helped 3 team members" bgColor="bg-rose-500/10" borderColor="border-rose-500/20" locked />
    </div>;
};
interface BadgeProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  bgColor: string;
  borderColor: string;
  new?: boolean;
  locked?: boolean;
}
const Badge = ({
  icon,
  title,
  description,
  bgColor,
  borderColor,
  new: isNew,
  locked
}: BadgeProps) => {
  return <div className={`relative flex flex-col items-center p-4 rounded-lg border ${borderColor} ${bgColor} ${locked ? "opacity-50" : ""}`}>
      {isNew && <span className="absolute -top-2 -right-2 bg-indigo-500 text-white text-xs px-2 py-0.5 rounded-full">
          New!
        </span>}
      <div className="p-3 rounded-full bg-slate-800/50 mb-3">{icon}</div>
      <h3 className="font-medium text-center">{title}</h3>
      <p className="text-xs text-slate-400 text-center mt-1">{description}</p>
      {locked && <div className="absolute inset-0 bg-slate-900/50 rounded-lg flex items-center justify-center">
          <div className="bg-slate-800 rounded-full p-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400">
              <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
        </div>}
    </div>;
};