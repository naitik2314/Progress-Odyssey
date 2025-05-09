// src/components/CreateQuestModal.tsx
import React, { useState, useEffect } from 'react';
import { XIcon, CalendarIcon, SparklesIcon, Loader2 } from 'lucide-react';

interface CreateQuestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onQuestCreate: (questData: QuestFormData) => Promise<void>; // Updated to be async
}

export interface QuestFormData {
  title: string;
  description: string;
  targetDate: string;
  useAi: boolean;
}

export interface QuestStep {
  day: number;
  taskTitle: string;
  taskDescription: string;
  duration: string;
  xp: number;
  completed: boolean; // Added for tracking
}

export interface GeneratedPlan {
  questTitle: string;
  plan: QuestStep[];
}

export const CreateQuestModal: React.FC<CreateQuestModalProps> = ({ isOpen, onClose, onQuestCreate }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [targetDate, setTargetDate] = useState('');
  const [useAi, setUseAi] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Set a default target date (e.g., 7 days from now) when the modal opens
    if (isOpen) {
      const defaultDate = new Date();
      defaultDate.setDate(defaultDate.getDate() + 7);
      setTargetDate(defaultDate.toISOString().split('T')[0]);
      setError(null); // Clear previous errors
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!title || !description || !targetDate) {
      setError("All fields are required.");
      return;
    }
    if (new Date(targetDate) <= new Date()) {
      setError("Target date must be in the future.");
      return;
    }

    setIsLoading(true);
    try {
      await onQuestCreate({ title, description, targetDate, useAi });
      // If successful, onQuestCreate might call onClose or handle navigation.
      // If not, we might want to keep the modal open or show success here.
      // For now, we assume onQuestCreate handles closing on success.
    } catch (apiError: any) {
      setError(apiError.message || "Failed to create quest. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 backdrop-blur-sm p-4">
      <div className="bg-slate-800 p-6 rounded-xl shadow-2xl w-full max-w-lg border border-slate-700">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-white">
            <SparklesIcon className="inline-block mr-2 text-purple-400" size={28} />
            Create New Quest
          </h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-200 transition-colors"
            aria-label="Close modal"
          >
            <XIcon size={24} />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-500/20 border border-red-700 text-red-300 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="questTitle" className="block text-sm font-medium text-slate-300 mb-1">
              Quest Title
            </label>
            <input
              type="text"
              id="questTitle"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Learn Advanced React Patterns"
              required
              className="w-full bg-slate-700 border border-slate-600 text-slate-200 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-shadow"
            />
          </div>

          <div>
            <label htmlFor="questDescription" className="block text-sm font-medium text-slate-300 mb-1">
              Goal Description
            </label>
            <textarea
              id="questDescription"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              placeholder="Describe your goal in detail. What does success look like?"
              required
              className="w-full bg-slate-700 border border-slate-600 text-slate-200 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-shadow"
            />
          </div>

          <div>
            <label htmlFor="targetDate" className="block text-sm font-medium text-slate-300 mb-1">
              Target Completion Date
            </label>
            <div className="relative">
              <input
                type="date"
                id="targetDate"
                value={targetDate}
                onChange={(e) => setTargetDate(e.target.value)}
                required
                min={new Date().toISOString().split('T')[0]} // Prevent selecting past dates
                className="w-full bg-slate-700 border border-slate-600 text-slate-200 rounded-lg p-3 pr-10 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-shadow appearance-none"
                style={{ colorScheme: 'dark' }}
              />
              <CalendarIcon size={20} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
             <div className="flex items-center">
                <input
                    id="aiAssistance"
                    name="aiAssistance"
                    type="checkbox"
                    checked={useAi}
                    onChange={(e) => setUseAi(e.target.checked)}
                    className="h-5 w-5 text-purple-500 bg-slate-600 border-slate-500 rounded focus:ring-purple-600 cursor-pointer focus:ring-offset-slate-800"
                />
                <label htmlFor="aiAssistance" className="ml-2 text-sm text-slate-300 cursor-pointer">
                    Use AI to break down this quest?
                </label>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2.5 px-6 rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-75 transition-all duration-150 ease-in-out disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <Loader2 size={20} className="animate-spin mr-2" />
              ) : (
                <SparklesIcon size={18} className="mr-2" />
              )}
              {isLoading ? 'Generating Plan...' : 'Create Quest'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
