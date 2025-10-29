import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { User, UserFormData, UserErrors } from "../../types/user";
import { getAllUsers, updateProfile } from "../api/authService";
import { handleError, handleSuccess } from "../utils/toastHandler";

interface UserState {
  // State
  users: User[];
  loading: boolean;
  userLoading: boolean;
  error: string;
  searchTerm: string;
  formData: UserFormData;
  errors: UserErrors;

  // Actions
  setUsers: (users: User[]) => void;
  setLoading: (loading: boolean) => void;
  setUserLoading: (loading: boolean) => void;
  setError: (error: string) => void;
  setSearchTerm: (searchTerm: string) => void;
  setFormData: (formData: Partial<UserFormData>) => void;
  setErrors: (errors: UserErrors) => void;
  resetForm: () => void;
  prepareEditForm: (user: User) => void;

  // Async Actions
  fetchUsers: () => Promise<void>;
  updateUser: (e: React.FormEvent) => Promise<void>;
}

export const useUserStore = create<UserState>()(
  devtools(
    (set, get) => ({
      users: [],
      loading: false,
      userLoading: false,
      error: "",
      searchTerm: "",
      formData: {
        fullName: "",
        email: "",
        userId: "",
      },
      errors: {},

      setUsers: (users) => set({ users }),
      setLoading: (loading) => set({ loading }),
      setUserLoading: (userLoading) => set({ userLoading }),
      setError: (error) => set({ error }),
      setSearchTerm: (searchTerm) => set({ searchTerm }),

      setFormData: (formData) =>
        set((state) => ({
          formData: { ...state.formData, ...formData },
          errors: {
            ...state.errors,
            ...Object.keys(formData).reduce(
              (acc, key) => ({
                ...acc,
                [key]: "",
              }),
              {},
            ),
          },
        })),

      setErrors: (errors) => set({ errors }),

      resetForm: () =>
        set({
          formData: { fullName: "", email: "", userId: "" },
          errors: {},
        }),

      prepareEditForm: (user) =>
        set({
          formData: {
            fullName: user.fullName,
            email: user.email,
            userId: user._id,
          },
          errors: {},
        }),

      fetchUsers: async () => {
        const { setLoading, setError, setUsers } = get();

        try {
          setLoading(true);
          setError("");

          const response = await getAllUsers("");
          setUsers(response.data.users || []);
        } catch (err: any) {
          setError(err?.message || "Failed to fetch users");
          handleError(err);
        } finally {
          setLoading(false);
        }
      },

      updateUser: async (e: React.FormEvent) => {
        e.preventDefault();
        const { formData, setUserLoading, setErrors, resetForm, fetchUsers } =
          get();

        try {
          setUserLoading(true);
          setErrors({});

          const { fullName, email, userId } = formData;

          if (userId) {
            const res = await updateProfile(userId, fullName, email);
            handleSuccess(res?.message || "User updated successfully");
          } else {
            // Create new user
            // const res = await createUser(fullName, email);
            // handleSuccess(res?.message || 'User created successfully');
          }

          resetForm();
          await fetchUsers();
        } catch (err: any) {
          if (err instanceof Error && "issues" in err) {
            const zodError = err as any;
            const fieldErrors: UserErrors = {};

            if (Array.isArray(zodError.issues)) {
              zodError.issues.forEach((issue: any) => {
                if (issue.path?.[0]) {
                  fieldErrors[issue.path[0] as keyof UserErrors] =
                    issue.message;
                }
              });
            }

            setErrors(fieldErrors);
          } else {
            handleError(err);
          }
        } finally {
          setUserLoading(false);
        }
      },
    }),
    {
      name: "user-store",
    },
  ),
);

export const useUsers = () => useUserStore((state) => state.users);
export const useUsersLoading = () => useUserStore((state) => state.loading);
export const useUserLoading = () => useUserStore((state) => state.userLoading);
export const useUsersError = () => useUserStore((state) => state.error);
export const useSearchTerm = () => useUserStore((state) => state.searchTerm);
export const useFormData = () => useUserStore((state) => state.formData);
export const useFormErrors = () => useUserStore((state) => state.errors);

export const useUserActions = () =>
  useUserStore((state) => ({
    setSearchTerm: state.setSearchTerm,
    setFormData: state.setFormData,
    resetForm: state.resetForm,
    prepareEditForm: state.prepareEditForm,
    fetchUsers: state.fetchUsers,
    updateUser: state.updateUser,
  }));
