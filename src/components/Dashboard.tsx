// src/components/Dashboard.tsx
import React, { useState } from "react";
import { Avatar } from "./Avatar";
import { ProgressCard } from "./ProgressCard";
import { QuestLog } from "./QuestLog"; // QuestLog will now trigger the modal
import { BadgeCollection } from "./BadgeCollection";
import { MotivationCard } from "./MotivationCard";
import { CreateQuestModal, QuestFormData, GeneratedPlan, QuestStep } from "./CreateQuestModal";
import { BellIcon, ChevronRightIcon } from "lucide-react"; // Removed PlusCircleIcon

// Define a simple type for an active quest for demonstration
interface ActiveQuest extends GeneratedPlan {
  id: string;
  createdAt: string;
}

export const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeQuests, setActiveQuests] = useState<ActiveQuest[]>([]);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleCreateQuest = async (questData: QuestFormData) => {
    console.log("Quest Data from Modal:", questData);
    // --- HERE YOU WILL CALL YOUR BACKEND API ---
    // For now, let's simulate an API call and a response from Gemini
    setIsModalOpen(false); // Optimistically close modal, or wait for API response

    // Simulate API call delay and processing
    // In a real app, you'd have a loading state in the modal or on the button
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Mocked response from the backend (which would have called Gemini)
    const mockSteps: QuestStep[] = questData.useAi ? [
      { day: 1, taskTitle: `Understand ${questData.title} Basics`, taskDescription: "Research core concepts and gather resources.", duration: "2 hours", xp: 50, completed: false },
      { day: 2, taskTitle: `Setup for ${questData.title}`, taskDescription: "Install tools, create project structure.", duration: "1.5 hours", xp: 40, completed: false },
      { day: 3, taskTitle: `First Practical Step for ${questData.title}`, taskDescription: "Complete a small tutorial or initial task.", duration: "2.5 hours", xp: 75, completed: false },
    ] : [
      { day: 1, taskTitle: `Begin working on ${questData.title}`, taskDescription: questData.description, duration: "Ongoing", xp: 100, completed: false }
    ];

    const newQuestPlan: GeneratedPlan = {
      questTitle: questData.title,
      plan: mockSteps,
    };

    const newActiveQuest: ActiveQuest = {
      ...newQuestPlan,
      id: `quest-${Date.now()}`, // Simple unique ID
      createdAt: new Date().toISOString(),
    }

    setActiveQuests(prevQuests => [newActiveQuest, ...prevQuests]);
    console.log("Simulated new quest plan:", newActiveQuest);

    // Modal is already closed or will be closed by the modal itself upon successful submission
    // handleCloseModal(); // No longer strictly needed here if modal handles its own close on success
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Welcome header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">
            Welcome back, Explorer!
          </h1>
          <p className="text-slate-400 mt-1">
            Continue your journey to productivity mastery
          </p>
        </div>
        {/* The "New Quest" button that was here has been removed */}
        <button className="hidden md:flex items-center bg-slate-700 hover:bg-slate-600 text-white rounded-lg px-4 py-2.5 text-sm transition-colors">
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
          {/* Pass activeQuests and handleOpenModal to QuestLog */}
          <QuestLog
            activeQuests={activeQuests}
            onNewQuestClick={handleOpenModal} // Pass the function to open the modal
          />
          
          {/* Example: Displaying newly created quest titles directly in Dashboard for quick check */}
          {activeQuests.length > 0 && (
            <div className="mt-6 p-4 bg-slate-800 border border-slate-700 rounded-xl">
              <h3 className="text-lg font-semibold mb-2 text-purple-300">Recently Added Quest Plans:</h3>
              <ul className="space-y-1 text-sm">
                {activeQuests.map(quest => (
                  <li key={quest.id} className="text-slate-300">
                    - {quest.questTitle} ({quest.plan.length} steps)
                  </li>
                ))}
              </ul>
            </div>
          )}

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

      {/* Modal for Creating New Quest */}
      <CreateQuestModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onQuestCreate={handleCreateQuest}
      />
    </div>
  );
};
