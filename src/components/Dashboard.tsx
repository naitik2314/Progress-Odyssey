// src/components/Dashboard.tsx
import React, { useState } from "react";
import { Avatar } from "./Avatar";
import { ProgressCard } from "./ProgressCard";
import { QuestLog } from "./QuestLog";
import { BadgeCollection } from "./BadgeCollection";
import { MotivationCard } from "./MotivationCard";
import { CreateQuestModal, QuestFormData, GeneratedPlan, QuestStep } from "./CreateQuestModal";
import { BellIcon, ChevronRightIcon } from "lucide-react";

// Updated ActiveQuest interface
interface ActiveQuest extends GeneratedPlan {
  id: string;
  createdAt: string;
  originalDescription?: string; // To store the original description from the form
  targetDate?: string;        // To store the target date from the form
}

export const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeQuests, setActiveQuests] = useState<ActiveQuest[]>([]);

  const handleOpenModal = () => {
    setIsModalOpen(true); // Clear previous errors when opening
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Updated to call the backend API
  const handleCreateQuest = async (questData: QuestFormData) => {
    console.log("Attempting to create quest with data:", questData);

    // The CreateQuestModal will handle its own loading state and error display based on this promise.
    try {
      const response = await fetch('http://localhost:3001/api/quests/create-plan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(questData), // Send all data from the form
      });

      if (!response.ok) {
        // Try to parse the error message from the backend
        const errorData = await response.json().catch(() => ({ message: `HTTP error! status: ${response.status}` }));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const newQuestPlanFromServer: GeneratedPlan = await response.json();
      console.log("Received plan from backend:", newQuestPlanFromServer);

      const newActiveQuest: ActiveQuest = {
        ...newQuestPlanFromServer, // Spread the plan received from the server
        id: `quest-${Date.now()}`,  // Frontend generated ID for now; backend could also provide this
        createdAt: new Date().toISOString(),
        originalDescription: questData.description, // Keep original description
        targetDate: questData.targetDate,           // Keep target date
      };

      setActiveQuests(prevQuests => [newActiveQuest, ...prevQuests]);
      handleCloseModal(); // Close the modal on successful creation

      // Optionally, you can add a more sophisticated success notification here
      // For example, using a toast library: toast.success("Quest created successfully!");

    } catch (error: any) {
      console.error("Failed to create quest:", error);
      // Re-throw the error so that the CreateQuestModal's handleSubmit
      // can catch it and update its internal error state to display the message.
      throw error;
    }
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
          <QuestLog
            activeQuests={activeQuests}
            onNewQuestClick={handleOpenModal}
          />
          
          {/* Example: Displaying newly created quest titles directly in Dashboard for quick check */}
          {activeQuests.length > 0 && (
            <div className="mt-6 p-4 bg-slate-800 border border-slate-700 rounded-xl">
              <h3 className="text-lg font-semibold mb-2 text-purple-300">Recently Added Quest Plans (via Backend):</h3>
              <ul className="space-y-1 text-sm">
                {activeQuests.map(quest => (
                  <li key={quest.id} className="text-slate-300">
                    - {quest.questTitle} ({quest.plan.length} steps planned by {quest.plan[0]?.taskTitle.startsWith('AI:') ? 'AI' : 'User'})
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
        onQuestCreate={handleCreateQuest} // This now calls the backend
      />
    </div>
  );
};
