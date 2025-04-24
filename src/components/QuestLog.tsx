import React from "react";
import { CheckCircleIcon, ClockIcon, TrendingUpIcon, BookOpenIcon } from "lucide-react";
export const QuestLog = () => {
  return <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl font-bold">Active Quests</h2>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-4 py-2 rounded-lg transition-colors">
          New Quest
        </button>
      </div>
      <div className="space-y-4">
        <QuestItem title="Complete Project Milestone" type="Daily" difficulty="Hard" reward="250 XP" progress={75} dueTime="2 hours" icon={<TrendingUpIcon size={16} className="text-indigo-400" />} />
        <QuestItem title="Read Industry Article" type="Knowledge" difficulty="Easy" reward="50 XP" progress={30} dueTime="Today" icon={<BookOpenIcon size={16} className="text-emerald-400" />} />
        <QuestItem title="Team Collaboration" type="Weekly" difficulty="Medium" reward="150 XP" progress={100} completed icon={<CheckCircleIcon size={16} className="text-purple-400" />} />
      </div>
      <button className="w-full mt-4 text-center text-indigo-400 hover:text-indigo-300 text-sm py-2">
        View All Quests
      </button>
    </div>;
};
interface QuestItemProps {
  title: string;
  type: string;
  difficulty: "Easy" | "Medium" | "Hard";
  reward: string;
  progress: number;
  dueTime?: string;
  completed?: boolean;
  icon: React.ReactNode;
}
const QuestItem = ({
  title,
  type,
  difficulty,
  reward,
  progress,
  dueTime,
  completed = false,
  icon
}: QuestItemProps) => {
  const difficultyColor = {
    Easy: "bg-emerald-500/20 text-emerald-400",
    Medium: "bg-amber-500/20 text-amber-400",
    Hard: "bg-rose-500/20 text-rose-400"
  };
  return <div className={`border ${completed ? "border-slate-600 bg-slate-700/30" : "border-slate-700"} rounded-lg p-4`}>
      <div className="flex justify-between">
        <div className="flex items-start">
          <div className="mt-0.5">{icon}</div>
          <div className="ml-3">
            <h3 className={`font-medium ${completed ? "text-slate-400 line-through" : "text-white"}`}>
              {title}
            </h3>
            <div className="flex items-center mt-1">
              <span className="text-xs text-slate-400 mr-2">{type}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full ${difficultyColor[difficulty]}`}>
                {difficulty}
              </span>
            </div>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium text-indigo-400">{reward}</p>
          {!completed && dueTime && <div className="flex items-center justify-end mt-1 text-xs text-slate-400">
              <ClockIcon size={12} className="mr-1" />
              <span>Due in {dueTime}</span>
            </div>}
        </div>
      </div>
      <div className="mt-3">
        <div className="flex justify-between mb-1 text-xs">
          <span className="text-slate-400">Progress</span>
          <span className="text-white font-medium">{progress}%</span>
        </div>
        <div className="w-full bg-slate-700 rounded-full h-1.5">
          <div className={`${completed ? "bg-slate-500" : "bg-gradient-to-r from-indigo-500 to-purple-600"} h-1.5 rounded-full`} style={{
          width: `${progress}%`
        }}></div>
        </div>
      </div>
    </div>;
};