import { useStore } from "../../store/store";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";
import { Outlet } from "react-router-dom";
const Layout = () => {
  const { isCollapsed } = useStore();
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div
        className={`flex-1 flex flex-col ${isCollapsed ? "lg:ml-0" : "lg:ml-0"}`}
      >
        <Navbar />
        <main className="flex-1 overflow-auto p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
