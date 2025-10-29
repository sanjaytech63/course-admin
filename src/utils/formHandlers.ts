import { FormEvent } from "react";

interface FormSubmitOptions {
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
  onFinally?: () => void;
}

export const handleFormSubmit = async (
  e: FormEvent<HTMLFormElement>,
  submitFn: (formData: FormData) => Promise<any>,
  options: FormSubmitOptions = {},
) => {
  e.preventDefault();

  const { onSuccess, onError, onFinally } = options;

  try {
    const formData = new FormData(e.currentTarget);
    const result = await submitFn(formData);

    if (onSuccess) {
      onSuccess(result);
    }

    return result;
  } catch (error) {
    if (onError) {
      onError(error);
    }
    throw error;
  } finally {
    if (onFinally) {
      onFinally();
    }
  }
};

export const createFormData = (data: Record<string, any>): FormData => {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      if (value instanceof File) {
        formData.append(key, value);
      } else if (Array.isArray(value)) {
        value.forEach((item) => formData.append(key, item.toString()));
      } else if (typeof value === "object") {
        formData.append(key, JSON.stringify(value));
      } else {
        formData.append(key, value.toString());
      }
    }
  });

  return formData;
};

export const handleDelete = async (
  id: string,
  deleteFn: (id: string) => Promise<any>,
  options: FormSubmitOptions = {},
) => {
  const { onSuccess, onError, onFinally } = options;

  try {
    if (!confirm("Are you sure you want to delete this item?")) {
      return;
    }

    const result = await deleteFn(id);

    if (onSuccess) {
      onSuccess(result);
    }

    return result;
  } catch (error) {
    if (onError) {
      onError(error);
    }
    throw error;
  } finally {
    if (onFinally) {
      onFinally();
    }
  }
};
