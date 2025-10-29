import React from "react";
import { Card } from "../ui/Card";
import InputField from "../ui/InputField";
import Button from "../ui/Button";
import { FiDownload, FiRefreshCw, FiTrash2 } from "react-icons/fi";

interface SubscriberActionsProps {
  searchText: string;
  onSearchChange: (value: string) => void;
  selectedCount: number;
  onClearSelection: () => void;
  onBulkUnsubscribe: () => void;
  onExport: () => void;
  onRefresh: () => void;
  loading?: boolean;
  actionLoading?: boolean;
}

export const SubscriberActions: React.FC<SubscriberActionsProps> = ({
  searchText,
  onSearchChange,
  selectedCount,
  onClearSelection,
  onBulkUnsubscribe,
  onExport,
  onRefresh,
  loading = false,
  actionLoading = false,
}) => {
  const handleSearchChange = (value: any) => {
    try {
      if (value && value.target && value.target.value !== undefined) {
        onSearchChange(value.target.value);
      } else if (typeof value === "string") {
        onSearchChange(value);
      } else if (value && value.value !== undefined) {
        onSearchChange(value.value);
      } else if (value && value.detail && value.detail.value !== undefined) {
        onSearchChange(value.detail.value);
      }
    } catch (error) {
      console.error("Error handling search change:", error);
    }
  };

  return (
    <Card>
      <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
        <div className="flex-1 w-full lg:w-auto">
          <div className="relative max-w-md">
            <InputField
              type="search"
              placeholder="Search subscribers by email..."
              value={searchText}
              onChange={handleSearchChange}
              className="pl-10"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={onExport} disabled={actionLoading}>
            <FiDownload className="w-4 h-4" />
            <span> Export CSV</span>
          </Button>

          <Button variant="outline" onClick={onRefresh} disabled={loading}>
            <FiRefreshCw
              className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
            />
            <span> Refresh</span>
          </Button>

          {selectedCount > 0 && (
            <>
              <span className="text-sm text-gray-600">
                {selectedCount} selected
              </span>
              <Button variant="outline" onClick={onClearSelection}>
                Clear
              </Button>
              <Button variant="danger" onClick={onBulkUnsubscribe}>
                <FiTrash2 className="w-4 h-4" />
                <span>Unsubscribe Selected</span>
              </Button>
            </>
          )}
        </div>
      </div>
    </Card>
  );
};
