import React, { useEffect, useState } from 'react'
import { getAllUsers } from '../api/authService';

export const useFetch = () => {
    const [users, setUsers] = useState<any>([]);
    const [loading, setLoading] = useState(false);
    const [fetchErrors, setFetchErrors] = useState("");

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const response = await getAllUsers();
            setUsers(response.data.users || []);

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

    return { users, loading, fetchErrors, fetchUsers }
}

