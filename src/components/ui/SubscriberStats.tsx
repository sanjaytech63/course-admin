import React from "react";
import { Card } from "../ui/Card";
import { FiUsers, FiMail, FiTrash2 } from "react-icons/fi";

interface SubscriberStatsProps {
  total: number;
  active: number;
  inactive: number;
}

export const SubscriberStats: React.FC<SubscriberStatsProps> = ({
  total,
  active,
  inactive,
}) => {
  const stats = [
    {
      label: "Total Subscribers",
      value: total,
      icon: FiUsers,
      color: "text-blue-500",
    },
    {
      label: "Active Subscribers",
      value: active,
      icon: FiMail,
      color: "text-green-500",
    },
    {
      label: "Inactive Subscribers",
      value: inactive,
      icon: FiTrash2,
      color: "text-red-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat, index) => (
        <Card key={index} className="text-center">
          <div className="p-6">
            <stat.icon className={`w-8 h-8 ${stat.color} mx-auto mb-3`} />
            <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
            <p className="text-gray-600 text-sm">{stat.label}</p>
          </div>
        </Card>
      ))}
    </div>
  );
};
