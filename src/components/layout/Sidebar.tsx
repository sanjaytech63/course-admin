import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useStore } from '../../store/store';
import {
    FiHome,
    FiUsers,
    FiBook,
    FiFileText,
    FiSettings,
    FiLogOut,
    FiMenu,
    FiX
} from 'react-icons/fi';
import Logo from '../ui/Logo';
import Button from '../ui/Button';
import { useAuth } from '../../hooks/useAuth';

const menuItems = [
    { icon: FiHome, label: 'Dashboard', path: '/' },
    { icon: FiUsers, label: 'Users', path: '/users' },
    { icon: FiBook, label: 'Courses', path: '/courses' },
    { icon: FiFileText, label: 'Blogs', path: '/blogs' },
    { icon: FiSettings, label: 'Settings', path: '/settings' },
];

export const Sidebar: React.FC = () => {
    const { handleLogout } = useAuth();
    const { pathname } = useLocation();
    const { isCollapsed, toggleSidebar } = useStore();

    return (
        <>
            {!isCollapsed && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                    onClick={toggleSidebar}
                />
            )}

            <div className={`
                fixed lg:static inset-y-0 left-0 z-50
                bg-white border-r border-gray-200
                transition-all duration-300 ease-in-out
                transform
                ${isCollapsed ? '-translate-x-full lg:translate-x-0 lg:w-20' : 'translate-x-0 w-64'}
            `}>
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                    {!isCollapsed && (
                        <Logo />
                    )}
                    <div
                        onClick={toggleSidebar}
                        className="p-2 rounded-lg hover:bg-indigo-100 cursor-pointer"
                    >
                        {isCollapsed ? <FiMenu size={24} /> : <FiX size={20} />}
                    </div>
                </div>

                <nav className="p-4 space-y-2">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center cursor-pointer space-x-2 pl-3 py-3 rounded-md text-sm font-medium transition-all duration-300 group
                                ${pathname === item.path
                                        ? 'text-indigo-600 bg-indigo-50 font-semibold'
                                        : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-100'
                                    }`}>

                                <Icon size={20} />
                                {!isCollapsed && (
                                    <span className="ml-3 font-medium">{item.label}</span>
                                )}

                            </Link>
                        );
                    })}
                </nav>
                <div className='bottom-4 fixed w-full px-4'>
                    <Button className='w-full over-fellow-hidden' onClick={handleLogout}>
                        <FiLogOut size={20} />
                        {!isCollapsed && (
                            <span className="font-medium">Logout</span>
                        )}
                    </Button>
                </div>
            </div>
        </>
    );
};