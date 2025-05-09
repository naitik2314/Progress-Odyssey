// src/components/QuestLog.tsx
import React from "react";
import { CheckCircleIcon, ClockIcon, TrendingUpIcon, BookOpenIcon, ListChecksIcon, PlusCircleIcon } from "lucide-react"; // Added ListChecksIcon, PlusCircleIcon
import { GeneratedPlan, QuestStep } from "./CreateQuestModal"; // Assuming these types are in CreateQuestModal or a shared types file

// Interface for the quests coming from Dashboard.tsx
interface ActiveQuest extends GeneratedPlan {
  id: string;
  createdAt: string;
}

// Props for the QuestLog component
interface QuestLogProps {
  activeQuests: ActiveQuest[];
  onNewQuestClick: () => void;
}

export const QuestLog: React.FC<QuestLogProps> = ({ activeQuests, onNewQuestClick }) => {
  // --- Hardcoded initial quests for demonstration if activeQuests is empty ---
  // In a real app, these would likely come from a database or initial state
  const initialQuests: QuestItemProps[] = [
    { id: "q1", title: "Complete Project Milestone", type: "Daily", difficulty: "Hard", reward: "250 XP", progress: 75, dueTime: "2 hours", icon: <TrendingUpIcon size={16} className="text-indigo-400" /> },
    { id: "q2", title: "Read Industry Article", type: "Knowledge", difficulty: "Easy", reward: "50 XP", progress: 30, dueTime: "Today", icon: <BookOpenIcon size={16} className="text-emerald-400" /> },
    { id: "q3", title: "Team Collaboration", type: "Weekly", difficulty: "Medium", reward: "150 XP", progress: 100, completed: true, icon: <CheckCircleIcon size={16} className="text-purple-400" /> },
  ];

  // Combine initial quests with dynamically added activeQuests
  // We'll map activeQuests to QuestItemProps structure
  const allQuestsToDisplay: QuestItemProps[] = [
    ...activeQuests.map(aq => {
      const totalSteps = aq.plan.length;
      const completedSteps = aq.plan.filter(step => step.completed).length;
      const progress = totalSteps > 0 ? Math.round((completedSteps / totalSteps) * 100) : 0;
      const totalXp = aq.plan.reduce((sum, step) => sum + step.xp, 0);

      return {
        id: aq.id,
        title: aq.questTitle,
        type: "AI Plan", // Placeholder type
        difficulty: "Medium", // Placeholder difficulty
        reward: `${totalXp} XP`,
        progress: progress,
        // dueTime: // This would ideally come from the targetDate of the quest
        icon: <ListChecksIcon size={16} className="text-sky-400" />, // Generic icon for new quests
        completed: progress === 100 && totalSteps > 0,
      };
    }),
    // Add initial quests only if no active (dynamic) quests are present, or always show them.
    // For this example, let's show dynamic ones first, then initial ones if no dynamic ones.
    // Or, you might fetch ALL quests from a backend.
    ...(activeQuests.length === 0 ? initialQuests : []) 
    // If you want to always show initial quests along with dynamic ones, and ensure no duplicates by ID:
    // ...initialQuests.filter(iq => !activeQuests.find(aq => aq.id === iq.id))
  ];


  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 shadow-xl">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl font-bold text-white">Active Quests</h2>
        <button
          onClick={onNewQuestClick} // Call the passed-in function here
          className="bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-75 flex items-center"
        >
          <PlusCircleIcon size={18} className="mr-2"/>
          New Quest
        </button>
      </div>

      {allQuestsToDisplay.length > 0 ? (
        <div className="space-y-4">
          {allQuestsToDisplay.map((quest) => (
            <QuestItem key={quest.id} {...quest} />
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
            <ListChecksIcon size={48} className="mx-auto text-slate-500 mb-3" />
            <p className="text-slate-400">No active quests yet.</p>
            <p className="text-sm text-slate-500">Click "New Quest" to start your adventure!</p>
        </div>
      )}
      
      {allQuestsToDisplay.length > 0 && (
        <button className="w-full mt-6 text-center text-purple-400 hover:text-purple-300 text-sm py-2 transition-colors">
          View All Quests
        </button>
      )}
    </div>
  );
};

// Extended QuestItemProps to include an 'id' for the key
interface QuestItemProps {
  id: string; // Added for React list key
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
  id, // Not used in rendering directly but good for key
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
  return (
    <div className={`border rounded-lg p-4 shadow-lg transition-all duration-300 ease-in-out hover:shadow-purple-500/20 ${completed ? "border-slate-600 bg-slate-700/60 opacity-70" : "border-slate-700 bg-slate-700/30 hover:border-slate-600"}`}>
      <div className="flex justify-between">
        <div className="flex items-start">
          <div className={`mt-1 p-1.5 rounded-full ${completed ? 'bg-slate-600' : 'bg-slate-900/50'}`}> {/* Icon background */}
            {icon}
          </div>
          <div className="ml-3">
            <h3 className={`font-semibold ${completed ? "text-slate-400 line-through" : "text-white"}`}>
              {title}
            </h3>
            <div className="flex items-center flex-wrap gap-2 mt-1">
              <span className="text-xs text-slate-400 px-2 py-0.5 bg-slate-600/50 rounded-full">{type}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full ${difficultyColor[difficulty]}`}>
                {difficulty}
              </span>
            </div>
          </div>
        </div>
        <div className="text-right flex-shrink-0">
          <p className={`text-sm font-medium ${completed ? 'text-purple-500' : 'text-purple-400'}`}>{reward}</p>
          {!completed && dueTime && (
            <div className="flex items-center justify-end mt-1 text-xs text-slate-400">
              <ClockIcon size={12} className="mr-1" />
              <span>Due in {dueTime}</span>
            </div>
          )}
           {completed && (
            <div className="flex items-center justify-end mt-1 text-xs text-green-400">
                <CheckCircleIcon size={12} className="mr-1" />
                <span>Completed</span>
            </div>
          )}
        </div>
      </div>
      <div className="mt-3">
        <div className="flex justify-between mb-1 text-xs">
          <span className="text-slate-400">Progress</span>
          <span className={`${completed? 'text-slate-400' : 'text-white'} font-medium`}>{progress}%</span>
        </div>
        <div className="w-full bg-slate-600 rounded-full h-2 overflow-hidden"> {/* Changed to h-2 for better visibility */}
          <div 
            className={`h-2 rounded-full transition-all duration-500 ease-out ${completed ? "bg-green-500" : "bg-gradient-to-r from-purple-500 to-indigo-500"}`} 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};
