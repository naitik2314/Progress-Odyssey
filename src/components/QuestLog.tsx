// src/components/QuestLog.tsx
import React, { useState } from "react";
import {
  CheckCircleIcon, ClockIcon, TrendingUpIcon, BookOpenIcon, ListChecksIcon,
  PlusCircleIcon, ChevronDownIcon, ChevronRightIcon, InfoIcon
} from "lucide-react";
import { QuestStep } from "./CreateQuestModal"; // Assuming QuestStep is here or in a shared types file
import { ActiveQuest } from "./Dashboard"; // Import ActiveQuest from Dashboard

// Props for the QuestLog component
interface QuestLogProps {
  activeQuests: ActiveQuest[];
  onNewQuestClick: () => void;
  onToggleStep: (questId: string, stepDay: number) => void; // Handler for step completion
}

export const QuestLog: React.FC<QuestLogProps> = ({ activeQuests, onNewQuestClick, onToggleStep }) => {
  // Hardcoded initial quests for demonstration if activeQuests is empty
  // These won't have interactive steps unless you adapt them fully to ActiveQuest structure
  const initialQuestsForDisplay = [
    { id: "q1", questTitle: "Complete Project Milestone", type: "Daily", difficulty: "Hard", reward: "250 XP", plan: [{day: 1, taskTitle: "Do it", taskDescription: "...", duration: "2 hours", xp: 250, completed: false}], icon: <TrendingUpIcon size={20} className="text-indigo-400" />, createdAt: new Date().toISOString() },
    // Add more if needed, ensuring they have a 'plan' array
  ];

  // Use activeQuests if available, otherwise fall back to initialQuestsForDisplay (mapped to ActiveQuest structure)
  const questsToDisplay = activeQuests.length > 0 ? activeQuests : initialQuestsForDisplay.map(q => ({
    ...q,
    // Calculate progress for initial quests if needed, or set to a default
    // For simplicity, initial quests here won't have dynamic progress based on steps
  }));


  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 md:p-6 shadow-xl">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl font-bold text-white">Active Quests</h2>
        <button
          onClick={onNewQuestClick}
          className="bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-75 flex items-center"
        >
          <PlusCircleIcon size={18} className="mr-2"/>
          New Quest
        </button>
      </div>

      {questsToDisplay.length > 0 ? (
        <div className="space-y-4">
          {questsToDisplay.map((quest) => (
            <QuestItem
              key={quest.id}
              quest={quest}
              onToggleStep={onToggleStep}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
            <ListChecksIcon size={48} className="mx-auto text-slate-500 mb-3" />
            <p className="text-slate-400">No active quests yet.</p>
            <p className="text-sm text-slate-500">Click "New Quest" to start your adventure!</p>
        </div>
      )}
      
      {questsToDisplay.length > 0 && (
        <button className="w-full mt-6 text-center text-purple-400 hover:text-purple-300 text-sm py-2 transition-colors">
          View All Quests
        </button>
      )}
    </div>
  );
};

// --- QuestItem Component ---
interface QuestItemProps {
  quest: ActiveQuest; // Now takes the full ActiveQuest object
  onToggleStep: (questId: string, stepDay: number) => void;
}

const QuestItem: React.FC<QuestItemProps> = ({ quest, onToggleStep }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const { id: questId, questTitle, plan } = quest;

  const totalSteps = plan.length;
  const completedSteps = plan.filter(step => step.completed).length;
  const progress = totalSteps > 0 ? Math.round((completedSteps / totalSteps) * 100) : 0;
  const isQuestCompleted = progress === 100 && totalSteps > 0;

  // Determine difficulty and type based on plan or use placeholders
  // This part may need more sophisticated logic if you want to derive it
  const difficulty: "Easy" | "Medium" | "Hard" = quest.originalDescription?.toLowerCase().includes("easy") ? "Easy" : 
                                                 quest.originalDescription?.toLowerCase().includes("hard") ? "Hard" : "Medium";
  const type = quest.plan.length > 5 ? "Long Quest" : "Short Quest"; // Example logic
  const totalXp = plan.reduce((sum, step) => sum + (Number(step.xp) || 0), 0);
  const reward = `${totalXp} XP`;
  
  // Placeholder icon logic, can be refined
  const getIcon = () => {
    if (isQuestCompleted) return <CheckCircleIcon size={20} className="text-green-400" />;
    if (type === "Long Quest") return <TrendingUpIcon size={20} className="text-indigo-400" />;
    return <ListChecksIcon size={20} className="text-sky-400" />;
  };
  const icon = getIcon();


  const difficultyColor = {
    Easy: "bg-emerald-500/20 text-emerald-400",
    Medium: "bg-amber-500/20 text-amber-400",
    Hard: "bg-rose-500/20 text-rose-400"
  };

  return (
    <div className={`border rounded-lg shadow-lg transition-all duration-300 ease-in-out ${isQuestCompleted ? "border-slate-600 bg-slate-700/60 opacity-80" : "border-slate-700 bg-slate-700/30 hover:border-slate-600 hover:shadow-purple-500/10"}`}>
      {/* Quest Header - Clickable to expand */}
      <div 
        className="p-4 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
        role="button"
        tabIndex={0}
        onKeyPress={(e) => e.key === 'Enter' && setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
        aria-controls={`quest-steps-${questId}`}
      >
        <div className="flex justify-between items-start">
          <div className="flex items-start">
            <div className={`mt-1 p-1.5 rounded-full ${isQuestCompleted ? 'bg-slate-600' : 'bg-slate-900/50'}`}>
              {icon}
            </div>
            <div className="ml-3">
              <h3 className={`font-semibold text-base md:text-lg ${isQuestCompleted ? "text-slate-400 line-through" : "text-white"}`}>
                {questTitle}
              </h3>
              <div className="flex items-center flex-wrap gap-2 mt-1">
                <span className="text-xs text-slate-400 px-2 py-0.5 bg-slate-600/50 rounded-full">{type}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${difficultyColor[difficulty]}`}>
                  {difficulty}
                </span>
              </div>
            </div>
          </div>
          <div className="text-right flex-shrink-0 ml-2">
            <p className={`text-sm font-medium ${isQuestCompleted ? 'text-purple-500' : 'text-purple-400'}`}>{reward}</p>
            {isQuestCompleted ? (
              <div className="flex items-center justify-end mt-1 text-xs text-green-400">
                  <CheckCircleIcon size={12} className="mr-1" />
                  <span>Completed!</span>
              </div>
            ) : quest.targetDate && (
              <div className="flex items-center justify-end mt-1 text-xs text-slate-400">
                <ClockIcon size={12} className="mr-1" />
                <span>Target: {new Date(quest.targetDate).toLocaleDateString()}</span>
              </div>
            )}
          </div>
           <div className="ml-2 text-slate-400 hover:text-white transition-colors">
            {isExpanded ? <ChevronDownIcon size={20} /> : <ChevronRightIcon size={20} />}
          </div>
        </div>
        {/* Progress Bar */}
        <div className="mt-3">
          <div className="flex justify-between mb-1 text-xs">
            <span className="text-slate-400">Progress ({completedSteps}/{totalSteps})</span>
            <span className={`${isQuestCompleted? 'text-slate-400' : 'text-white'} font-medium`}>{progress}%</span>
          </div>
          <div className="w-full bg-slate-600 rounded-full h-2.5 overflow-hidden">
            <div 
              className={`h-2.5 rounded-full transition-all duration-500 ease-out ${isQuestCompleted ? "bg-green-500" : "bg-gradient-to-r from-purple-500 to-indigo-500"}`} 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Expandable Quest Steps Section */}
      {isExpanded && (
        <div id={`quest-steps-${questId}`} className="border-t border-slate-700/50 px-4 pt-4 pb-2 space-y-3">
          {plan.length > 0 ? plan.map((step) => (
            <div key={`${questId}-step-${step.day}`} className={`p-3 rounded-md transition-colors ${step.completed ? 'bg-green-500/10 border border-green-500/30' : 'bg-slate-800 border border-slate-700 hover:bg-slate-700/70'}`}>
              <div className="flex items-start">
                <input
                  type="checkbox"
                  id={`step-${questId}-${step.day}`}
                  checked={step.completed}
                  onChange={() => onToggleStep(questId, step.day)}
                  className="mt-1 h-5 w-5 text-purple-500 bg-slate-700 border-slate-600 rounded focus:ring-purple-600 cursor-pointer focus:ring-offset-slate-800"
                />
                <label htmlFor={`step-${questId}-${step.day}`} className="ml-3 flex-grow cursor-pointer">
                  <span className={`block font-medium text-sm ${step.completed ? 'text-green-300 line-through' : 'text-slate-200'}`}>
                    Day {step.day}: {step.taskTitle}
                  </span>
                  <p className={`text-xs mt-0.5 ${step.completed ? 'text-green-400/70' : 'text-slate-400'}`}>
                    {step.taskDescription}
                  </p>
                  <div className="mt-1 flex items-center gap-3 text-xs">
                    {step.duration && <span className="text-slate-500 flex items-center"><ClockIcon size={12} className="mr-1 opacity-70"/> {step.duration}</span>}
                    {step.xp && <span className="text-purple-400/80 font-medium">+{step.xp} XP</span>}
                  </div>
                </label>
              </div>
            </div>
          )) : (
            <div className="text-center py-3 text-slate-500 text-sm">
                <InfoIcon size={18} className="inline mr-1 mb-0.5"/> No specific steps defined for this quest.
            </div>
          )}
        </div>
      )}
    </div>
  );
};
