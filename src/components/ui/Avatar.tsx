import React, { useState, useRef, useEffect } from 'react';
import Button from "../ui/Button"
import { IoMdLogOut } from 'react-icons/io';
import { Link } from 'react-router-dom';

export default function Avatar({
    src,
    size = 48,
    alt = 'avatar',
    email = '',
    fullName = '',
    onLogout,
}: {
    src: string;
    size?: number;
    alt?: string;
    email?: string;
    fullName?: string;
    onLogout?: () => void;
}) {
    const [showCard, setShowCard] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (cardRef.current && !cardRef.current.contains(e.target as Node)) {
                setShowCard(false);
            }
        };

        if (showCard) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showCard]);

    return (
        <div ref={cardRef} className="relative inline-block">
            <div
                className="relative"
                style={{ width: size, height: size }}
                onClick={() => setShowCard(prev => !prev)}
            >
                {!loaded && (
                    <div
                        className="absolute inset-0 rounded-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse"
                        aria-hidden
                    />
                )}

                <img
                    src={src}
                    alt={alt}
                    loading="lazy"
                    decoding="async"
                    onLoad={() => setLoaded(true)}
                    style={{ width: size, height: size }}
                    className="rounded-full object-fit  p-2 hover:bg-gray-200 cursor-pointer transition-transform duration-300"
                />
            </div>

            {showCard && (
                <div className="absolute right-0 mt-3 w-60 p-4 bg-white rounded-xl shadow-lg border border-gray-100 z-[1000]">
                    <div className="flex items-center gap-3">
                        <img
                            src={src}
                            alt={alt}
                            loading="lazy"
                            decoding="async"
                            style={{ width: 40, height: 40 }}
                            className="rounded-full object-fit border border-gray-200"
                        />
                        <div>
                            <h3 className="font-semibold text-gray-900 text-sm capitalize">
                                {fullName || 'User Name'}
                            </h3>
                            <p className="text-gray-500 text-xs truncate">{email || 'user@example.com'}</p>
                        </div>
                    </div>

                    <div className="mt-4 flex flex-col gap-2">
                        <Link onClick={() => { setShowCard(false) }} to={"/profile"} className="text-sm text-indigo-600 hover:text-indigo-800 text-left cursor-pointer">
                            View Profile
                        </Link>

                        <Link onClick={() => { setShowCard(false) }} to={"/settings"} className="text-sm text-indigo-600 hover:text-indigo-800 text-left cursor-pointer">
                            Settings
                        </Link>
                        <Button
                            onClick={() => {
                                onLogout?.();
                                setShowCard(false);
                            }}
                            className="flex items-center justify-center gap-2 text-sm rounded-md"
                        >
                            <IoMdLogOut size={16} />
                            <span>Logout</span>
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
