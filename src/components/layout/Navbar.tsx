import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../store/store';
import { FiBell, FiMenu } from 'react-icons/fi';
import InputField from '../ui/InputField';
import Avatar from '../ui/Avatar';
import { useAuth } from '../../hooks/useAuth';
import Logo from '../ui/Logo';

export const Navbar: React.FC = () => {
    const { isAuthenticated, user, handleLogout } = useAuth();
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const { toggleSidebar } = useStore();

    return (
        <header className="bg-white border-b px-6 border-gray-200 sticky top-0 z-30">
            <div className="flex items-center justify-between  py-3">
                <div className="flex items-center space-x-4">
                    <div
                        onClick={toggleSidebar}
                        className="p-2 rounded-lg hover:bg-gray-100 transition-colors lg:hidden"
                    >
                        <FiMenu size={20} />
                    </div>

                    <div className="relative hidden md:block">
                        <Logo />
                    </div>
                </div>

                <div className="flex items-center space-x-4">
                    <button className="p-2 rounded-full hover:bg-gray-200 transition-colors relative">
                        <FiBell size={20} />
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                            3
                        </span>
                    </button>

                    <div onClick={() => setIsProfileOpen(!isProfileOpen)} className="flex cursor-pointer items-center space-x-2 ">
                        {isAuthenticated && user &&
                            <Avatar
                                src={user.avatar}
                                fullName={user.fullName}
                                email={user.email}
                                size={48}
                                onLogout={handleLogout}
                            />
                        }
                    </div>
                </div>
            </div>
        </header>
    );
};