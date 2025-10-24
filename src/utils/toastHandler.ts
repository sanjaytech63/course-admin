import { Success, Error } from './toast';

export const handleError = (err: any) => {
  console.error('Error occurred:', err);

  const message = err?.response?.data?.message || err?.message || 'Something went wrong!';

  Error(message);
};

export const handleSuccess = (message: string) => {
  console.log('Success:', message);
  Success(message);
};
