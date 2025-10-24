
import Button from '../components/ui/Button';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';

interface CreateColumnsProps {
    onEdit: (user: any) => void;
    onDelete: (user: any) => void;
}

export interface Column {
    key: string;
    header: string;
    render?: (value: any, row: any) => React.ReactNode;
}

export const createColumns = ({ onEdit, onDelete }: CreateColumnsProps): Column[] => [
    {
        key: 'user',
        header: 'User',
        render: (_, row) => (
            <div className="flex items-center space-x-3">
                <img
                    src={row.avatar}
                    alt={row.fullName}
                    className="w-10 h-10 rounded-full object-cover border border-gray-200"
                />
                <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-900 capitalize truncate">
                        {row.fullName}
                    </p>
                    <p className="text-sm text-gray-500 truncate">{row.email}</p>
                </div>
            </div>
        ),
    },
    {
        key: 'role',
        header: 'Role',
        render: (value) => (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 capitalize">
                {value}
            </span>
        ),
    },
    {
        key: 'status',
        header: 'Status',
        render: (value) => (
            <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium capitalize ${value === 'active'
                    ? 'bg-green-100 text-green-800'
                    : value === 'inactive'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
            >
                {value}
            </span>
        ),
    },
    {
        key: 'joinDate',
        header: 'Join Date',
        render: (value) => (
            <span className="text-sm text-gray-900 whitespace-nowrap">
                {new Date(value).toLocaleDateString('en-IN', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                })}
            </span>
        ),
    },
    {
        key: 'actions',
        header: 'Actions',
        render: (_, row) => (
            <div className="flex items-center space-x-2">
                <Button
                    onClick={() => onEdit(row)}
                    size="small"
                    className="h-8 w-8"
                >
                    <FiEdit2 className="h-4 w-4" />
                </Button>
                <Button
                    onClick={() => onDelete(row)}
                    size="small"
                    className="h-8 w-8"
                >
                    <FiTrash2 className="h-4 w-4" />
                </Button>
            </div>
        ),
    },
];