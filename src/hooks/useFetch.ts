import React, { useEffect, useState } from 'react'
import { getAllUsers } from '../api/authService';

export const useFetch = () => {
    const [users, setUsers] = useState<any>([]);
    const [loading, setLoading] = useState(false);
    const [fetchErrors, setFetchErrors] = useState("");
    const [previousCount, setPreviousCount] = useState(0);
    const fetchUsers = async () => {
        try {
            setLoading(true);
            const response = await getAllUsers();
            setUsers(response.data.users || []);
            setPreviousCount(users.length);

        } catch (err: any) {
            setFetchErrors(err || "something worng")
            console.error('Error fetching users:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const calculateTrend = () => {
        if (previousCount === 0) return { value: 0, isPositive: true };

        const change = users.length - previousCount;
        const percentage = previousCount > 0 ? (change / previousCount) * 100 : 100;

        return {
            value: Math.abs(Math.round(percentage)),
            isPositive: change >= 0
        };
    };

    return { users, loading, fetchErrors, fetchUsers, calculateTrend }
}



