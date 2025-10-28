export const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
};

export const getReadTimeNumber = (readTime: string): number => {
    const match = readTime.match(/\d+/);
    return match ? parseInt(match[0]) : 5;
};

export const getBadgeColor = (badge: string) => {
    const colors = {
        new: 'bg-green-100 text-green-800 border-green-200',
        trending: 'bg-orange-100 text-orange-800 border-orange-200',
        popular: 'bg-yellow-100 text-yellow-800 border-yellow-200',
        featured: 'bg-purple-100 text-purple-800 border-purple-200',
        recommended: 'bg-blue-100 text-blue-800 border-blue-200',
        advanced: 'bg-red-100 text-red-800 border-red-200',
        beginner: 'bg-emerald-100 text-emerald-800 border-emerald-200',
        exclusive: 'bg-pink-100 text-pink-800 border-pink-200',
        updated: 'bg-cyan-100 text-cyan-800 border-cyan-200',
        limited: 'bg-amber-100 text-amber-800 border-amber-200'
    };
    return colors[badge as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200';
};

export const getCategoryColor = (category: string) => {
    const colors = {
        frontend: 'bg-blue-50 text-blue-700 border-blue-200',
        backend: 'bg-green-50 text-green-700 border-green-200',
        fullstack: 'bg-purple-50 text-purple-700 border-purple-200',
        webdesign: 'bg-pink-50 text-pink-700 border-pink-200',
        mobile: 'bg-orange-50 text-orange-700 border-orange-200',
        devops: 'bg-cyan-50 text-cyan-700 border-cyan-200',
        cybersecurity: 'bg-red-50 text-red-700 border-red-200',
        testing: 'bg-amber-50 text-amber-700 border-amber-200'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-50 text-gray-700 border-gray-200';
};



export const getLevelColor = (category: string) => {
    const colors = {
        beginner: 'bg-blue-50 text-blue-700 border-blue-200',
        intermediate: 'bg-green-50 text-green-700 border-green-200',
        advanced: 'bg-purple-50 text-purple-700 border-purple-200',
    };
    return colors[category as keyof typeof colors] || 'bg-gray-50 text-gray-700 border-gray-200';
};