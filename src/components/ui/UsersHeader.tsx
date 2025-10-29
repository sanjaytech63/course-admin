import React from "react";
import Button from "../../components/ui/Button";
import { FiPlus, FiUsers } from "react-icons/fi";

interface UsersHeaderProps {
  userCount: number;
  filteredCount: number;
  onCreateUser: () => void;
}

export const UsersHeader: React.FC<UsersHeaderProps> = ({
  userCount,
  filteredCount,
  onCreateUser,
}) => (
  <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
    <div className="flex items-center space-x-4">
      <div className="p-3 bg-indigo-100 rounded-xl">
        <FiUsers className="h-6 w-6 text-indigo-600" />
      </div>
      <div>
        <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
        <p className="text-gray-600 mt-1">
          Manage {userCount} user{userCount !== 1 ? "s" : ""} in your platform
          {/* {filteredCount !== userCount && ` • Showing ${filteredCount} result${filteredCount !== 1 ? 's' : ''}`} */}
        </p>
      </div>
    </div>

    <Button
      onClick={onCreateUser}
      className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm hover:shadow-md transition-all duration-200"
    >
      <FiPlus className="mr-2 h-5 w-5" />
      Add New User
    </Button>
  </div>
);
