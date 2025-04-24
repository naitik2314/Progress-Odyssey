import React from "react";
interface ProgressCardProps {
  title: string;
  value: string;
  subtitle: string;
  percentage: number;
  color: "indigo" | "emerald" | "amber" | "rose";
}
export const ProgressCard = ({
  title,
  value,
  subtitle,
  percentage,
  color
}: ProgressCardProps) => {
  const colorStyles = {
    indigo: {
      bg: "bg-indigo-500",
      text: "text-indigo-400",
      gradient: "from-indigo-500 to-indigo-600"
    },
    emerald: {
      bg: "bg-emerald-500",
      text: "text-emerald-400",
      gradient: "from-emerald-500 to-emerald-600"
    },
    amber: {
      bg: "bg-amber-500",
      text: "text-amber-400",
      gradient: "from-amber-500 to-amber-600"
    },
    rose: {
      bg: "bg-rose-500",
      text: "text-rose-400",
      gradient: "from-rose-500 to-rose-600"
    }
  };
  const {
    bg,
    text,
    gradient
  } = colorStyles[color];
  return <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
      <h3 className="text-sm text-slate-400">{title}</h3>
      <div className="flex items-baseline mt-1">
        <p className="text-2xl font-bold">{value}</p>
        <p className={`ml-2 text-xs ${text}`}>{subtitle}</p>
      </div>
      <div className="mt-3">
        <div className="w-full bg-slate-700 rounded-full h-1.5">
          <div className={`bg-gradient-to-r ${gradient} h-1.5 rounded-full`} style={{
          width: `${percentage}%`
        }}></div>
        </div>
      </div>
    </div>;
};