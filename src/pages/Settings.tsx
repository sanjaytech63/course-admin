import React from 'react';
import { Card } from '../components/ui/Card';
import Button from '../components/ui/Button';
import InputField from '../components/ui/InputField';

export const Settings: React.FC = () => {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
                <p className="text-gray-600">Manage your account settings and preferences</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <Card
                        title="Profile Settings"
                        padding="lg"
                    >
                        <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <InputField label="First Name" placeholder="John" />
                                <InputField label="Last Name" placeholder="Doe" />
                            </div>
                            <InputField label="Email" type="email" placeholder="john@example.com" />
                            <InputField label="Phone" placeholder="+1 (555) 123-4567" />
                            <div className="flex justify-end">
                                <Button>Update Profile</Button>
                            </div>
                        </div>
                    </Card>

                    <Card
                        title="Security"
                        padding="lg"
                    >
                        <div className="space-y-4">
                            <InputField
                                label="Current Password"
                                type="password"
                                placeholder="Enter current password"
                            />
                            <InputField
                                label="New Password"
                                type="password"
                                placeholder="Enter new password"
                            />
                            <InputField
                                label="Confirm New Password"
                                type="password"
                                placeholder="Confirm new password"
                            />
                            <div className="flex justify-end">
                                <Button>Update Password</Button>
                            </div>
                        </div>
                    </Card>
                </div>

                <div className="space-y-6">
                    <Card
                        title="Account"
                        padding="md"
                    >
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Plan</span>
                                <span className="font-medium">Pro</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Status</span>
                                <span className="text-green-600 font-medium">Active</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Member since</span>
                                <span className="font-medium">Jan 2023</span>
                            </div>
                        </div>
                    </Card>

                    <Card
                        title="Preferences"
                        padding="md"
                    >
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-gray-700">Email notifications</span>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" className="sr-only peer" defaultChecked />
                                    <div className="w-11 h-6 bg-gray-200  rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                                </label>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-gray-700">Dark mode</span>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" className="sr-only peer" />
                                    <div className="w-11 h-6 bg-gray-200  rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                                </label>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};