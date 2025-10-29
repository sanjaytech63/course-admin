import React from "react";
import { useNetworkStatus } from "../../hooks/useNetworkStatus";

const NetworkStatusBanner = () => {
  const isOnline = useNetworkStatus();

  if (isOnline) return null;

  return (
    <div className="fixed  top-0 left-0 w-full bg-red-600 text-white text-center py-4 z-50">
      ⚠ You are currently offline. Some features may not work.
    </div>
  );
};

export default NetworkStatusBanner;
