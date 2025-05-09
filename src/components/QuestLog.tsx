// src/components/QuestLog.tsx
import React, { useState, useMemo } from "react"; // Added useMemo
import {
  CheckCircleIcon, ClockIcon, TrendingUpIcon, BookOpenIcon, ListChecksIcon,
  PlusCircleIcon, ChevronDownIcon, ChevronRightIcon, InfoIcon, AlertTriangleIcon, EyeIcon
} from "lucide-react";
import { QuestStep } from "./CreateQuestModal";
import { ActiveQuest } from "./Dashboard";

interface QuestLogProps {
  activeQuests: ActiveQuest[];
  onNewQuestClick: () => void;
  onToggleStep: (questId: string, stepDay: number) => void;
}

export const QuestLog: React.FC<QuestLogProps> = ({ activeQuests, onNewQuestClick, onToggleStep }) => {
  // Explicitly type initialQuestsForDisplay as ActiveQuest[]
  const initialQuestsForDisplay: ActiveQuest[] = [
    // Example of a fully typed initial quest:
    // {
    //   id: "q1",
    //   questTitle: "Complete Project Milestone Example",
    //   plan: [
    //     {day: 1, taskTitle: "Initial planning", taskDescription: "Define scope of the milestone.", duration: "1 hour", xp: 20, completed: false},
    //     {day: 2, taskTitle: "Development phase 1", taskDescription: "Build core features for the milestone.", duration: "3 hours", xp: 50, completed: false}
    //   ],
    //   createdAt: new Date().toISOString(),
    //   originalDescription: "This is an example of a hard daily task for the milestone.",
    //   targetDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString() // Example: 3 days from now
    // },
  ];

  const questsToDisplay: ActiveQuest[] = activeQuests.length > 0 ? activeQuests : initialQuestsForDisplay.map(q => ({
    // Ensure all properties of ActiveQuest are correctly mapped or provided
    id: q.id,
    questTitle: q.questTitle || "Untitled Initial Quest",
    plan: q.plan || [],
    createdAt: q.createdAt || new Date().toISOString(),
    originalDescription: q.originalDescription,
    targetDate: q.targetDate,
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

interface QuestItemProps {
  quest: ActiveQuest;
  onToggleStep: (questId: string, stepDay: number) => void;
}

const QuestItem: React.FC<QuestItemProps> = ({ quest, onToggleStep }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showAllSteps, setShowAllSteps] = useState(false); 

  const { id: questId, questTitle, plan } = quest;

  const {
    todaysStep,
    tomorrowsStep,
    missedSteps,
    hasMissedSteps,
    overallProgress,
    isQuestFullyCompleted,
    totalXpYield
  } = useMemo(() => {
    const firstUncompletedStepIndex = plan.findIndex(step => !step.completed);
    let currentTodaysStep: QuestStep | null = null;
    let currentTomorrowsStep: QuestStep | null = null;
    const currentMissedSteps: QuestStep[] = [];

    if (firstUncompletedStepIndex !== -1) {
      currentTodaysStep = plan[firstUncompletedStepIndex];
      if (firstUncompletedStepIndex + 1 < plan.length) {
        currentTomorrowsStep = plan[firstUncompletedStepIndex + 1];
      }
      for (let i = 0; i < firstUncompletedStepIndex; i++) {
        if (!plan[i].completed) { 
            currentMissedSteps.push(plan[i]);
        }
      }
    }
    
    const completedStepsCount = plan.filter(step => step.completed).length;
    const progressCalc = plan.length > 0 ? Math.round((completedStepsCount / plan.length) * 100) : 0;
    const questCompletedCalc = progressCalc === 100 && plan.length > 0;
    const xpCalc = plan.reduce((sum, step) => sum + (Number(step.xp) || 0), 0);

    return {
      todaysStep: currentTodaysStep,
      tomorrowsStep: currentTomorrowsStep,
      missedSteps: currentMissedSteps,
      hasMissedSteps: currentMissedSteps.length > 0,
      overallProgress: progressCalc,
      isQuestFullyCompleted: questCompletedCalc,
      totalXpYield: xpCalc
    };
  }, [plan]);

  const difficulty: "Easy" | "Medium" | "Hard" = quest.originalDescription?.toLowerCase().includes("easy") ? "Easy" : 
                                                 quest.originalDescription?.toLowerCase().includes("hard") ? "Hard" : "Medium";
  const type = plan.length > 7 ? "Epic Quest" : plan.length > 3 ? "Long Quest" : "Short Quest";
  const reward = `${totalXpYield} XP`;
  
  const getIcon = () => {
    if (isQuestFullyCompleted) return <CheckCircleIcon size={20} className="text-green-400" />;
    if (hasMissedSteps) return <AlertTriangleIcon size={20} className="text-red-400" />;
    if (type === "Epic Quest") return <TrendingUpIcon size={20} className="text-purple-400" />;
    if (type === "Long Quest") return <TrendingUpIcon size={20} className="text-indigo-400" />;
    return <ListChecksIcon size={20} className="text-sky-400" />;
  };
  const icon = getIcon();

  const difficultyColor = {
    Easy: "bg-emerald-500/20 text-emerald-400",
    Medium: "bg-amber-500/20 text-amber-400",
    Hard: "bg-rose-500/20 text-rose-400"
  };

  const titleShouldBeStruck = (todaysStep && todaysStep.completed && !tomorrowsStep && !missedSteps.length) || isQuestFullyCompleted;


  return (
    <div className={`border rounded-lg shadow-lg transition-all duration-300 ease-in-out 
      ${isQuestFullyCompleted ? "border-green-500/30 bg-slate-700/50 opacity-90" 
      : hasMissedSteps ? "border-red-500/30 bg-slate-700/50" 
      : "border-slate-700 bg-slate-700/30 hover:border-slate-600 hover:shadow-purple-500/10"}`}>
      {/* Quest Header */}
      <div 
        className="p-4 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
        role="button" tabIndex={0} onKeyPress={(e) => e.key === 'Enter' && setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded} aria-controls={`quest-steps-${questId}`}
      >
        <div className="flex justify-between items-start">
          <div className="flex items-start flex-grow min-w-0"> 
            <div className={`mt-1 p-1.5 rounded-full ${isQuestFullyCompleted ? 'bg-green-700/50' : hasMissedSteps ? 'bg-red-700/50' : 'bg-slate-900/50'}`}>
              {icon}
            </div>
            <div className="ml-3 flex-grow min-w-0"> 
              <h3 className={`font-semibold text-base md:text-lg truncate ${titleShouldBeStruck ? "text-slate-400 line-through" : hasMissedSteps ? "text-red-300" : "text-white"}`}>
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
            <p className={`text-sm font-medium ${isQuestFullyCompleted ? 'text-green-400' : 'text-purple-400'}`}>{reward}</p>
            {isQuestFullyCompleted ? (
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
           <div className="ml-2 text-slate-400 hover:text-white transition-colors flex-shrink-0">
            {isExpanded ? <ChevronDownIcon size={20} /> : <ChevronRightIcon size={20} />}
          </div>
        </div>
        {/* Progress Bar */}
        <div className="mt-3">
          <div className="flex justify-between mb-1 text-xs">
            <span className="text-slate-400">Progress ({plan.filter(s => s.completed).length}/{plan.length})</span>
            <span className={`${isQuestFullyCompleted? 'text-slate-400' : 'text-white'} font-medium`}>{overallProgress}%</span>
          </div>
          <div className="w-full bg-slate-600 rounded-full h-2.5 overflow-hidden">
            <div 
              className={`h-2.5 rounded-full transition-all duration-500 ease-out ${isQuestFullyCompleted ? "bg-green-500" : hasMissedSteps && overallProgress < 100 ? "bg-red-500" : "bg-gradient-to-r from-purple-500 to-indigo-500"}`} 
              style={{ width: `${overallProgress}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Expandable Quest Steps Section */}
      {isExpanded && (
        <div id={`quest-steps-${questId}`} className="border-t border-slate-700/50 px-4 pt-4 pb-2 space-y-3">
          <div className="text-right mb-2">
            <button 
              onClick={() => setShowAllSteps(!showAllSteps)}
              className="text-xs text-sky-400 hover:text-sky-300 flex items-center ml-auto px-2 py-1 rounded hover:bg-sky-500/10 transition-colors"
            >
              <EyeIcon size={14} className="mr-1"/> {showAllSteps ? "Show Focused View" : "Show All Steps"}
            </button>
          </div>

          {showAllSteps ? (
            plan.length > 0 ? plan.map((step) => ( 
              <StepDisplay key={`${questId}-all-step-${step.day}`} step={step} questId={questId} onToggleStep={onToggleStep} />
            )) : (
                 <div className="text-center py-3 text-slate-500 text-sm">
                    <InfoIcon size={18} className="inline mr-1 mb-0.5"/> No steps defined for this quest.
                </div>
            )
          ) : ( 
            <>
              {missedSteps.map((step) => (
                <StepDisplay key={`${questId}-missed-step-${step.day}`} step={step} questId={questId} onToggleStep={onToggleStep} mode="missed" />
              ))}
              {todaysStep && (
                <StepDisplay key={`${questId}-today-step-${todaysStep.day}`} step={todaysStep} questId={questId} onToggleStep={onToggleStep} mode="today" />
              )}
              {tomorrowsStep && (
                <StepDisplay key={`${questId}-tomorrow-step-${tomorrowsStep.day}`} step={tomorrowsStep} questId={questId} onToggleStep={onToggleStep} mode="tomorrow" />
              )}
              {!todaysStep && !missedSteps.length && plan.length > 0 && isQuestFullyCompleted && (
                 <div className="p-3 rounded-md bg-green-500/10 border border-green-500/30 text-center">
                    <CheckCircleIcon size={20} className="inline mr-2 text-green-400"/>
                    <span className="text-sm text-green-300">All steps completed! Well done!</span>
                </div>
              )}
               {plan.length === 0 &&( 
                 <div className="text-center py-3 text-slate-500 text-sm">
                    <InfoIcon size={18} className="inline mr-1 mb-0.5"/> No steps defined for this quest.
                </div>
              )}
              {plan.length > 0 && !isQuestFullyCompleted && !todaysStep && !missedSteps.length && !tomorrowsStep && (
                 <div className="text-center py-3 text-slate-500 text-sm">
                    <InfoIcon size={18} className="inline mr-1 mb-0.5"/> No current tasks to display. Check "Show All Steps".
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

interface StepDisplayProps {
  step: QuestStep;
  questId: string;
  onToggleStep: (questId: string, stepDay: number) => void;
  mode?: "today" | "tomorrow" | "missed" | "all"; 
}

const StepDisplay: React.FC<StepDisplayProps> = ({ step, questId, onToggleStep, mode = "all" }) => {
  let modeStyles = "bg-slate-800 border-slate-700 hover:bg-slate-700/70"; 
  let titleColor = step.completed ? 'text-green-300 line-through' : 'text-slate-200';
  let descriptionColor = step.completed ? 'text-green-400/70' : 'text-slate-400';

  if (step.completed) {
    modeStyles = 'bg-green-500/10 border-green-500/30';
  } else {
    switch (mode) {
      case "today":
        modeStyles = "bg-sky-500/10 border-sky-500/40 hover:bg-sky-500/20"; 
        titleColor = 'text-sky-200';
        break;
      case "tomorrow":
        modeStyles = "bg-slate-800/70 border-slate-700/50 opacity-70 hover:opacity-100"; 
        titleColor = 'text-slate-400';
        descriptionColor = 'text-slate-500';
        break;
      case "missed":
        modeStyles = "bg-red-500/10 border-red-500/30 hover:bg-red-500/20"; 
        titleColor = 'text-red-300';
        break;
    }
  }

  return (
    <div className={`p-3 rounded-md transition-colors ${modeStyles}`}>
      <div className="flex items-start">
        <input
          type="checkbox"
          id={`step-${questId}-${step.day}`}
          checked={step.completed}
          onChange={() => onToggleStep(questId, step.day)}
          disabled={mode === "tomorrow" && !step.completed} 
          className={`mt-1 h-5 w-5 text-purple-500 bg-slate-700 border-slate-600 rounded focus:ring-purple-600 cursor-pointer focus:ring-offset-slate-800 disabled:opacity-50 disabled:cursor-not-allowed`}
        />
        <label htmlFor={`step-${questId}-${step.day}`} className="ml-3 flex-grow cursor-pointer">
          <span className={`block font-medium text-sm ${titleColor}`}>
            Day {step.day}: {step.taskTitle}
          </span>
          <p className={`text-xs mt-0.5 ${descriptionColor}`}>
            {step.taskDescription}
          </p>
          <div className="mt-1 flex items-center gap-3 text-xs">
            {step.duration && <span className="text-slate-500 flex items-center"><ClockIcon size={12} className="mr-1 opacity-70"/> {step.duration}</span>}
            {step.xp && <span className={`${step.completed ? 'text-green-400/70' : 'text-purple-400/80'} font-medium`}>+{step.xp} XP</span>}
          </div>
        </label>
      </div>
    </div>
  );
};
