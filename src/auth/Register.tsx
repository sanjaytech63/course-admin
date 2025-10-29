import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import InputField from "../components/ui/InputField";
import { BiLock, BiMailSend } from "react-icons/bi";
import Button from "../components/ui/Button";
import { FiUserPlus } from "react-icons/fi";
import { handleError, handleSuccess } from "../utils/toastHandler";
import { registerUserSchema } from "../validations/userValidation";
import { register } from "../api/authService";

export interface FormDataType {
  fullName: string;
  email: string;
  password: string;
  avatar?: File | null;
}

const Register = () => {
  const [formData, setFormData] = useState<FormDataType>({
    fullName: "",
    email: "",
    password: "",
    avatar: null,
  });

  const [errors, setErrors] = useState<FormDataType>({
    fullName: "",
    email: "",
    password: "",
    avatar: null,
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange =
    (field: keyof FormDataType) =>
    (value: string, e?: React.ChangeEvent<HTMLInputElement>) => {
      if (field === "avatar" && e?.target.files && e.target.files.length > 0) {
        setFormData((prev) => ({ ...prev, avatar: e.target.files![0] }));
      } else {
        setFormData((prev) => ({ ...prev, [field]: value }));
      }
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const validatedData: FormDataType = registerUserSchema.parse({
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
      });

      if (!formData.avatar || formData.avatar.size === 0) {
        handleError("Please upload an avatar");
        return;
      }

      setLoading(true);

      const data = new FormData();
      data.append("fullName", validatedData.fullName);
      data.append("email", validatedData.email);
      data.append("password", validatedData.password);
      data.append("avatar", formData.avatar);

      const res: any = await register(data);
      handleSuccess(res.message);

      setFormData({ fullName: "", email: "", password: "", avatar: null });
      setErrors({ fullName: "", email: "", password: "", avatar: null });

      navigate("/login");
    } catch (err: any) {
      if (err.name === "ZodError") {
        const fieldErrors: any = {};
        if (Array.isArray(err.issues)) {
          err.issues.forEach((issue: any) => {
            if (issue.path?.[0]) fieldErrors[issue.path[0]] = issue.message;
          });
        }
        setErrors((prev) => ({ ...prev, ...fieldErrors }));
        return;
      }

      handleError(err?.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="flex justify-center">
            <div className="w-12 h-12 rounded-md bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center">
              <span className="text-white font-bold text-xl">S</span>
            </div>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign up to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{" "}
            <Link
              to="/login"
              className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150"
            >
              Sign in to your account
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <InputField
              type="text"
              name="fullName"
              label="Full name"
              placeholder="Enter full name"
              value={formData.fullName}
              onChange={handleChange("fullName")}
              error={errors.fullName}
              icon={<BiMailSend />}
            />

            <InputField
              type="email"
              name="email"
              label="Email address"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange("email")}
              error={errors.email}
              icon={<BiMailSend />}
            />

            <InputField
              type="file"
              name="avatar"
              label="Avatar"
              accept="image/*"
              onChange={handleChange("avatar")}
            />

            <InputField
              type="password"
              name="password"
              label="Password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange("password")}
              error={errors.password}
              icon={<BiLock />}
            />
          </div>
          <div>
            <Button
              isLoading={loading}
              type="submit"
              className="w-full flex items-center justify-center py-2.5 space-x-2 rounded-md text-sm"
            >
              <FiUserPlus size={16} />
              <span>Sign Up</span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
