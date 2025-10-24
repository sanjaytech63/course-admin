import { toast } from 'react-toastify';

export const Success = (msg: string) => toast.success(msg);
export const Error = (msg: string) => toast.error(msg);
export const Info = (msg: string) => toast.info(msg);
export const Warning = (msg: string) => toast.warning(msg);
